/*jshint esversion: 6 */

const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
	openBrowser: true,
	reportsDirectory: __dirname + '/reports',
	themeName: 'cover',
});

module.exports = {
	reporter: reporter.fn,
	urls: {
		base: 'http://fyvr.net/acme/',
		good: {
			about: 'content-good.html',
			apply: 'apply.html',
			products: 'data-good.html'
		},
		bad: {
			about: 'content-bad.html',
			apply: 'apply-bad.html',
			products: 'data-bad.html'
		}
	}
};
