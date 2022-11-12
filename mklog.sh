#!/usr/local/bin/fish
date '+%Y-%m-%d' | read DATE
mkdir ./content/blog/{$DATE} 
touch ./content/blog/{$DATE}/index.md
echo "---
title: 日報$DATE
date: \"$DATE\"
category: diary
draft: false
description:
---" > ./content/blog/{$DATE}/index.md