# Chirpy Starter [![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)](https://rubygems.org/gems/jekyll-theme-chirpy) [![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

When installing the [**Chirpy**][chirpy] theme through [RubyGems.org][gem], Jekyll can only read files in the folders `/_data`, `/_layouts`, `/_includes`, `/_sass` and `/assets`, as well as a small part of options of the `/_config.yml` file from the theme's gem. If you have ever installed this theme gem, you can use the command `bundle info --path jekyll-theme-chirpy` to locate these files.

The Jekyll team claims that this is to leave the ball in the user’s court, but this also results in users not being able to enjoy the out-of-the-box experience when using feature-rich themes.

To fully use all the features of **Chirpy**, you need to copy the other critical files from the theme's gem to your Jekyll site. The following is a list of targets:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

To save you time, and also in case you lose some files while copying, we extract those files/configurations of the latest version of the **Chirpy** theme and the [CD][CD] workflow to here, so that you can start writing in minutes.

## Prerequisites

Follow the instructions in the [Jekyll Docs](https://jekyllrb.com/docs/installation/) to complete the installation of `Ruby`, `RubyGems`, `Jekyll` and `Bundler`.

## Installation

[**Use this template**][use-template] to generate a brand new repository and name it `<GH_USERNAME>.github.io`, where `GH_USERNAME` represents your GitHub username.

Then clone it to your local machine and run:

```
$ bundle
```

## Usage

Please see the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy#documentation).

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[use-template]: https://github.com/cotes2020/chirpy-starter/generate
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE
