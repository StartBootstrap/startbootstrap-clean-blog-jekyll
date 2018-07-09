# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-clean-blog"
  spec.version       = "4.0.1"
  spec.authors       = ["Start Bootstrap"]
  spec.email         = ["feedback@startbootstrap.com"]

  spec.summary       = %q{A simple blog theme based on Bootstrap 4 by Start Bootstrap.}
  spec.homepage      = "https://github.com/blackrockdigital/startbootstrap-clean-blog-jekyll"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.6"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
