# Nightwatch E2E Accessibility Testing

A masochistic experiment of including accessibility tests into end-to-end testing via [Nightwatch.js](http://nightwatchjs.org/), testing against [@ted_drake](https://twitter.com/ted_drake)'s [a11y-control-test](http://fyvr.net/acme/index.html). Tests include HTML validation,
keyboard tab tests, and accessibility test using Deque's [aXe](http://www.deque.com/products/axe/) and [Tenon](http://tenon.io/) by [@karlgroves](https://twitter.com/karlgroves).

## Slides

Slides are available at Slideshare: [http://www.slideshare.net/gerardkcohen/accessibility-testing-tools-for-developers-gerard-k-cohen-csun-2016](http://www.slideshare.net/gerardkcohen/accessibility-testing-tools-for-developers-gerard-k-cohen-csun-2016)

## Installation

Install Node.js and then:

```sh
$ git clone https://github.com/gerardkcohen/nightwatch-a11y-testing.git
$ cd nightwatch-a11y-testing
$ npm install
```

## Run tests

Launch Nightwatch, using any of the available [Command-line Options](http://nightwatchjs.org/guide#command-line-options).

### Available WebDriver Environments

The following WebDriver environments are supported:

* Firefox (included with Selenium) - default
* Chrome (via [ChromeDriver](https://www.npmjs.com/package/chromedriver)) - chrome
* Safari (via [Selenium HQ](http://docs.seleniumhq.org/download/)) - safari

You can specify any particular WebDriver environment by using the `--env` option.

```sh
$ nightwatch // all environments
$ nightwatch --env default // firefox
$ nightwatch --env chrome
$ nightwatch --env safari
```

### Available Groups

You can specify the group using the --group option. There are two main Nightwatch groups, one using aXe and the other using Tenon. The are further broken up by page. Groups are based on the tests directory structure.

```
nightwath-a11y-testing/
  |
tests/
  ├── aXe
  |   ├── about
  |   └── apply
  |   └── products
  └── Tenon
      ├── about
      └── apply
      └── products
```

```sh
$ nightwatch // all groups
$ nightwatch --group aXe
$ nightwatch --group aXe/about
$ nightwatch --group aXe/apply
$ nightwatch --group aXe/products
$ nightwatch --group Tenon
$ nightwatch --group Tenon/about
$ nightwatch --group Tenon/apply
$ nightwatch --group Tenon/products
```

### Available Tags

Since the a11y-control-test project has both good and bad examples, these tests are further
split into 2 tags, simply `good` and `bad`. You can specify the group using the --tag option.

```sh
$ nightwatch --tag good
$ nightwatch --tag bad
```

### Environments, Groups, and Tags

Of course, Nightwatch gives you the ability to use any combination of environments, groups, and tags.

```sh
$ nightwatch --env chrome --group aXe --tag good // test all good tests with aXe using Chrome
$ nightwatch --env safari --group Tenon/apply --tag bad // test the bad apply page with Tenon using Safari
```

---

## Additional Information

I am not endorsing any of the products used here, or even the idea of this level of testing. Automated accessibility testing is really nice, but it should be a supplement to testing with actual assistive technologies, preferably with actual assistive technology users. I am thankful for the providers of the tools I used for this example. Please check the [RESOURCES](./RESOURCES.MD) for more information.

---

## History



* 09/10/2016 - Update npm dependencies, add visual/ CSS bookmarklet tests

