#!/bin/bash

find . -name \*.jpg -exec convert {} -resize 25% thumb/{} \;
