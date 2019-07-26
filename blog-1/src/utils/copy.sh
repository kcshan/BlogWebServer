#!/bin/sh
cd /Users/yangshasha/Downloads/workspace/coding/nodejs/WebServer/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log