---
layout: post
title: "First Post"
subtitle: "The plan to get this website off the ground"
background: '/img/posts/Website_Plan/bg-contact.jpg'
---




# This is the start of my project

## I will show a couple different plot types

### Matplot Liub




This is the first plot


```python
import matplotlib.pyplot as plt
import numpy as np
plt.plot([1, 2, 3, 4])
plt.ylabel('some numbers')
plt.show()

```


    
![png](/img/posts/first_plots/test_5_0.png)
    


#### Second Plot


```python
data = {'a': np.arange(50),
        'c': np.random.randint(0, 50, 50),
        'd': np.random.randn(50)}
data['b'] = data['a'] + 10 * np.random.randn(50)
data['d'] = np.abs(data['d']) * 100

plt.scatter('a', 'b', c='c', s='d', data=data)
plt.xlabel('entry a')
plt.ylabel('entry b')
plt.title('Test Matplot Lib')
plt.show()

```


    
![png](/img/posts/first_plots/test_7_0.png)
    



```python

```
