---
layout: post
title: "How I built this site"
date: 2020-07-19 09:30:00
categories: [Miscellaneous]
tags: [Intro]
last_modified_at: 2020-07-19
---

This site is built using [Jekyll](http://jekyllrb.com), a static site generator, and hosting on Github Pages. The theme of this site is the [Noir](https://github.com/essentialenemy/noir/) theme by [Victor Johnson](https://essentialenemy.com/).

### Overview

The Jekyll and Github Pages combination is particularly powerful because Github Pages has built-in support for Jekyll - meaning that given the correct set of files in your github pages repository, Github Pages will automatically build and deploy your site for you. 

As a general paradigm, the objective is to create and customize a set of configuration and content files in your Github Pages repository. Github Pages will take these files to publish your site. 

### High-level Tutorial

1. Set-up: Install [Jekyll and Ruby](https://jekyllrb.com/docs/installation/), as well as your preferred form of Git-SCM  (This is optional. I used [Git for Windows](https://gitforwindows.org/))
	* installing Jekyll and Ruby will allow you to build your website locally without deploying to github
	* using a Git-SCM is optional, but will allow you to manage version control of your github 

2. Create a new repository for your website. You can do this through Github's website and following the GUI. Name your repository `<user>.github.io`

3. *Download and Sync your Repository (Optional):* You should now be able to download this repository into a local folder on your desktop and sync with with the [online repository](https://www.toolsqa.com/git/local-repository-remote-repository/). You can then use your local folder to store themes, configuration files, etc., and push the contents to the online github repository when you want to update your site. This step is option, as you can also use the [github.com](https://github.com) website in order upload and manage your repository's files.

4. Pick a [theme](https://jekyllthemes.io/free) and download it. These files will make up the basis of your website's layout and feel. Changes to the content will be done by editing the Markdown, and on occassion, the HTML Files

5. Once you have the theme's file saved locally or in your online repository, you can go about customizing the site to fit your needs by making changes to editing or adding files to your repository. A couple of useful files are:
	* `_config.yml`: this is going to be mandatory to edit for your site, as it contains variables for your site's name, links, etc. Theme creators generally leave helpful comments, so it's good practice to scroll through these files and edit it based on the creator's suggestions
	* `/_layouts/default.html` : take a look at this file to edit things like navigation, directory, etc.
	* `/_posts/`: Jekyll has two types of webpages, both of which you can create content for by writing/storing Markdown files in the appropriate folder. "Posts" are blog-*post* style pages, and the files in this folder should always start with the format `yyyy-mm-dd`. Pages are more general (e.g., an about me page), and are created by storing a Markdown file in the root folder. Jekyll uses this distinction to (1) add layout / formatting to different and (2) paginate / organize your blog entries
		* Many themes will come with sample pages and posts included. To remove these, you can either edit out references to these `.md` files in the relevant files

6. If you're editing locally, commit the changes and push the files to your online repository