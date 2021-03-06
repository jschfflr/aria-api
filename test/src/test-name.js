var fs = require('fs');
var accnameTest = require('accname-test');

var files = {
	'w3c wiki': fs.readFileSync(__dirname + '/../../node_modules/accname-test/tests/w3c.html', 'utf8'),
	'labels': fs.readFileSync(__dirname + '/../../node_modules/accname-test/tests/labels.html', 'utf8'),
};

describe('getName / getDescription', function() {
	Object.keys(files).forEach(function(name) {
		var testbed = document.createElement('div');
		testbed.innerHTML = files[name];

		before(function() {
			document.body.appendChild(testbed);
		});

		after(function() {
			document.body.removeChild(testbed);
		});

		describe(name, function() {
			accnameTest.getTests(testbed).forEach(function(test) {
				it(test.comment || name, function() {
					if (test.name !== null) {
						expect(aria.getName(test.element)).toBe(test.name)
					}
					if (test.description !== null) {
						expect(aria.getDescription(test.element)).toBe(test.description)
					}
				});
			});
		});
	});
});
