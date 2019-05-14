FROM jekyll/jekyll:latest 

RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
RUN bundle install --no-cache

ADD . /app/
CMD bundle exec jekyll serve --force_polling  --host 0.0.0.0 --incremental 
