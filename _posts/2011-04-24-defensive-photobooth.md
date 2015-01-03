---
title:      "defensive photobooth"
subtitle:   "a.k.a Do Not Fuck With a Hacker's Machine"
date:       2011-04-24 12:00:00
---

English: Some time ago, inspired by…

…also known as the “Do not fuck with a hacker’s machine” clip, and the fact I started using Debian exclusively on my netbook, I decided to make preparations in advance for a dire situation in which my laptop is stolen/captured by insurgents, and retrieve it easier or even play a prank on them. These were my postulates:
I should always know the IP of my netbook, assuming it’s connected to the internet
If someone other than me is using my computer, he should be well (and discretely) photographed.
The pictures of people misusing my computer should be quickly and seamlessly transmitted to my server.
1. Finding the computer
This part is obvious and was even covered in the Defcon clip – simply using dyn-dns. Which is why we create an account on their website, choose a free domain and set up your computer to report its IP to dyndns’ servers.
?
01
02
03
04
05
06
07
08
09
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
nietaki@dblue:~$ su
Password:
root@dblue:/home/nietaki# apt-cache search dyndns | grep dyndns
dyndns - dynamic DNS (DDNS) update client implemented in Perl
tinydyndns - pop-before-dyndns service using djbdns
root@dblue:/home/nietaki#
root@dblue:/home/nietaki# apt-get install dyndns
### CIACH ###
root@dblue:/home/nietaki#
root@dblue:/home/nietaki# cat /etc/crontab
# /etc/crontab: system-wide crontab
# Unlike any other crontab you don't have to run the `crontab'
# command to install the new version when you edit this file
# and files in /etc/cron.d. These files also have username fields,
# that none of the other crontabs do.
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
# m h dom mon dow user    command
/20 *   * * *   nietaki dyndns --login nietaki --password almost_public_password --host my_dndns_host.dyndns.net --file /home/nietaki/ --urlping http://www.find-ip-address.org/show-ip.php -urlping-regex "Your IP Address is:\s*\<b\>\s*([\d.]+)" 2>/dev/null >/dev/null
17 *    * * *    root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *    root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7    root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *    root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
#
We basically install the perl dyndns updater (although you should be able to write something like that using e.g. curl) and edit /etc/crontab, to make cron run the program every 20 minutes (line 21 of the snippet). If any of the parameters isn’t clear you can consult the manual: ‘man dyndns’.
2. and 3. – photos and uploading them to the server
The idea here is as follows: as soon as the system loads the laptop should take pictures of the user every x seconds, until the user logs on to my account. Otherwise (if user doesn’t log in or uses the especially prepared “guest” account), it takes the pictures until the computer is turned off.  After each snapshot the script tries to synchronize the pictures with those already uploaded to the server – just in case the internet connection wasn’t available before.
We’re going to use the fswebcam (also available in debian packages) and rsync programs, and the magic of the /etc/init.d directory.
For our convenience the sript was divided into 4 parts:
?
1
2
3
4
nietaki@dblue:~$ sudo touch /etc/init.d/monitoring.sh
nietaki@dblue:~$ mkdir -p ~/.webcam/sav
nietaki@dblue:~$ cd .webcam
nietaki@dblue:~$ touch monitor.sh killer.sh webcontrol.sh
The monitor.sh file contains all the interesting stuff:
?
01
02
03
04
05
06
07
08
09
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
#!/bin/bash
format="+%Y_%m_%d--%H_%M_%S"
period=30
font="/usr/share/fonts/truetype/freefont/FreeMono.ttf:10"
resolution="640x480"
additional_params='--quiet '
finished=false
save_dir="/home/nietaki/.webcam/sav/"
user="uploader"
password="no-secret"
#filozofia - jestem odpalany jako nietaki, żeby gość nie mógł mnie zabić,
#uploaduje jako uploader
# upload
from_dir="/home/nietaki/.webcam/sav/"
to_dir="/home/uploader/monitor"
while ! $finished
do
  #robienie zdjec
  curdate="$(date $format;)"
  tmp_file="${save_dir}ss$curdate.jpg"
  fswebcam --font $font --resolution $resolution $additional_params $tmp_file
  #wysylanie na serwer
  rsync -aq $from_dir uploader@my_server_host.dyndns.info:$to_dir 2>/dev/null
  sleep $period;
done
exit 0
As you can see, my sevrer (my_server_host.dyndns.info) has a dedicated “uploader” account, just for receiving the uploaded photos and saving them in the right place. In my case rsync doesn’t need the uploader’s password, because on my server i edited the /home/uploader/.ssh/authorized_keys and added the public key of my laptop’s “nietaki” account. More information on that here. The rest is one infinite loop and parameters for rsync and fswebcam. Additionally you might want to make sure the file mode bits of monitor.sh are set up right, so that only your account can read it, using chmod;)
The killer.sh is there only to enable you to kill the monitor.sh when the time is right:
?
1
2
3
4
#!/bin/bash
#ubijamy monitor
ps aux | grep monitor.sh | grep bash |awk '{print $2}' |xargs kill 2> /dev/null
exit 0
…and I’m almost sure you can do it in a much nicer way;)
Now let’s see /etc/init.d/monitoring.sh
?
1
2
3
#!/bin/bash
su -c "/home/nietaki/.webcam/webcontrol.sh $1" nietaki &
exit 0
You can see right away this script just invokes webcontrol.sh with the same argument it itself gets, but for added safety, using the “nietaki” account already. I won’t delve into how the /etc/init.d directory works, it’s very well covered in the very same tutorial I have used, the important thing is, using update-rc.d command you can ask the system to run any given file located in /etc/init.d, with the “start” argument during system startup and “stop” during system shutdown.
And the last file – webcontrol.sh:
?
01
02
03
04
05
06
07
08
09
10
11
12
13
14
15
16
17
#!/bin/bash
#echo $1
if [ "$1" == "stop" ]; then
  echo 'shutting down webcam monitoring'
  /home/nietaki/.webcam/killer.sh
  exit 0
fi
#making sure I am the only running process of this type:
cnt="$(ps aux | grep monitor.sh | grep bash | wc -l)"
echo 'webcam monitoring started'
#echo $cnt
if [ $cnt -lt 1 ]; then
  /home/nietaki/.webcam/monitor.sh & > /dev/null
else
  echo "too many webcam monitoring instances are started"
fi
exit 0
If all our .sh files have the ‘chmod +x’ for the appropriate users, the whole system should be functional by now;)
One last thing we have to take care of is having our privacy protected when we ourselves log on to the computer. In Gnome you can do it by clicking through System->Preferences->Startup Applications, where you can add a new “startup program”:

And that is all! You can also make sure the “guest”‘s account our hypothetical thief would be logging onto isn’t password protected, is fully operational and has all sorts of interesting stuff on the Desktop: funny images, videoclips, porn. This way we can get more shots of the current owner of our beloved machine;).
My eee netbook has a little navy blue diode which lights up when a picture is taken, but you could easily mask it using black paint or some electrical tape.
Last by not least, a sample photo taken by the script:

One thing i feel is missing from the whole setup is being able to ssh to the laptop even if it’s in somebody elses hands, behind their firewall. But right now I don’t have an idea how I can do it well…
PS. I know macs have a program that does all that and much more, but the more interesting (and cheaper) thing is to write it yourself.
PS2. If you are going to be viewing the pictures more frequently you might want to modify the script so that the pictures get a new directory every now and then – any graphical interface will be loading their previews much faster this way. But I’ll leave it as an exercise to the reader (as many of my university’s textbooks say) and leave the script in an “almost done” state ;)






  ![](/img/photobooth/photos/{{ img }})

