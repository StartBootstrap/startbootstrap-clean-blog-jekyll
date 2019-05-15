rm -rf _site && \
docker run -ti --rm \
       -v $(PWD):/app \
       -w /app -p4000:4000 \
       jekyll/jekyll:latest \
       bash -c "bundle install --no-cache && bundle exec jekyll serve --force_polling  --host 0.0.0.0 --incremental"
