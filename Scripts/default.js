/*
 jQuery Validation Plugin v1.17.0

 https://jqueryvalidation.org/

 Copyright (c) 2017 Jörn Zaefferer
 Released under the MIT license
 jQuery Cycle2; build: v20131022
 http://jquery.malsup.com/cycle2/
 Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 core engine; version: 20131003  Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130304  caption plugin for Cycle2;  version: 20130306  command plugin for Cycle2;  version: 20130707  hash plugin for Cycle2;  version: 20130905  loader plugin for Cycle2;  version: 20131020  pager plugin for Cycle2;  version: 20130525  prevnext plugin for Cycle2;  version: 20130709  progressive loader plugin for Cycle2;  version: 20130315  tmpl plugin for Cycle2;  version: 20121227  carousel transition plugin for Cycle2;  version: 20130528  jQuery JavaScript Library v1.11.0
 http://jquery.com/

 Includes Sizzle.js
 http://sizzlejs.com/

 Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 Released under the MIT license
 http://jquery.org/license

 Date: 2014-01-23T21:02Z
 Sizzle CSS Selector Engine v1.10.16
 http://sizzlejs.com/

 Copyright 2013 jQuery Foundation, Inc. and other contributors
 Released under the MIT license
 http://jquery.org/license

 Date: 2014-01-13
 jQuery & Zepto Lazy - v1.7.10
 http://jquery.eisbehr.de/lazy/

 Copyright 2012 - 2018, Daniel 'Eisbehr' Kern

 Dual licensed under the MIT and GPL-2.0 licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html

 $("img.lazy").lazy();
 Bootstrap v3.4.1 (https://getbootstrap.com/)
 Copyright 2011-2019 Twitter, Inc.
 Licensed under the MIT license
 jquery.lightbox.js
 https://github.com/duncanmcdougall/Responsive-Lightbox
 Copyright 2013 Duncan McDougall and other contributors; @license Creative Commons Attribution 2.5

 Options:
 margin - int - default 50. Minimum margin around the image
 nav - bool - default true. enable navigation
 blur - bool - default true. Blur other content when open using css filter
 minSize - int - default 0. Min window width or height to open lightbox. Below threshold will open image in a new tab.

*/
(function (d) {
    d.extend(d.fn, {
        validate: function (m) {
            if (this.length) {
                var f = d.data(this[0], "validator"); if (f) return f; f = new d.validator(m, this[0]); d.data(this[0], "validator", f); f.settings.onsubmit && (this.find("input, button").filter(".cancel").click(function () { f.cancelSubmit = !0 }), f.settings.submitHandler && this.find("input, button").filter(":submit").click(function () { f.submitButton = this }), this.submit(function (a) {
                    function e() {
                        if (f.settings.submitHandler) {
                            if (f.submitButton) var k = d("<input type='hidden'/>").attr("name",
                                f.submitButton.name).val(f.submitButton.value).appendTo(f.currentForm); f.settings.submitHandler.call(f, f.currentForm); f.submitButton && k.remove(); return !1
                        } return !0
                    } f.settings.debug && a.preventDefault(); if (f.cancelSubmit) return f.cancelSubmit = !1, e(); if (f.form()) return f.pendingRequest ? (f.formSubmitted = !0, !1) : e(); f.focusInvalid(); return !1
                })); return f
            } m && m.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
        }, valid: function () {
            if (d(this[0]).is("form")) return this.validate().form();
            var m = !0, f = d(this[0].form).validate(); this.each(function () { m &= f.element(this) }); return m
        }, removeAttrs: function (m) { var f = {}, a = this; d.each(m.split(/\s/), function (e, k) { f[k] = a.attr(k); a.removeAttr(k) }); return f }, rules: function (m, f) {
            var a = this[0]; if (m) {
                var e = d.data(a.form, "validator").settings, k = e.rules, n = d.validator.staticRules(a); switch (m) {
                    case "add": d.extend(n, d.validator.normalizeRule(f)); k[a.name] = n; f.messages && (e.messages[a.name] = d.extend(e.messages[a.name], f.messages)); break; case "remove": if (!f) return delete k[a.name],
                        n; var p = {}; d.each(f.split(/\s/), function (q, u) { p[u] = n[u]; delete n[u] }); return p
                }
            } a = d.validator.normalizeRules(d.extend({}, d.validator.metadataRules(a), d.validator.classRules(a), d.validator.attributeRules(a), d.validator.staticRules(a)), a); a.required && (e = a.required, delete a.required, a = d.extend({ required: e }, a)); return a
        }
    }); d.extend(d.expr[":"], { blank: function (m) { return !d.trim("" + m.value) }, filled: function (m) { return !!d.trim("" + m.value) }, unchecked: function (m) { return !m.checked } }); d.validator = function (m, f) {
        this.settings =
        d.extend(!0, {}, d.validator.defaults, m); this.currentForm = f; this.init()
    }; d.validator.format = function (m, f) { if (1 == arguments.length) return function () { var a = d.makeArray(arguments); a.unshift(m); return d.validator.format.apply(this, a) }; 2 < arguments.length && f.constructor != Array && (f = d.makeArray(arguments).slice(1)); f.constructor != Array && (f = [f]); d.each(f, function (a, e) { m = m.replace(new RegExp("\\{" + a + "\\}", "g"), e) }); return m }; d.extend(d.validator, {
        defaults: {
            messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid",
            errorElement: "label", focusInvalid: !0, errorContainer: d([]), errorLabelContainer: d([]), onsubmit: !0, ignore: [], ignoreTitle: !1, onfocusin: function (m) { this.lastActive = m; this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, m, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(m)).hide()) }, onfocusout: function (m) { this.checkable(m) || !(m.name in this.submitted) && this.optional(m) || this.element(m) }, onkeyup: function (m) {
                (m.name in
                    this.submitted || m == this.lastElement) && this.element(m)
            }, onclick: function (m) { m.name in this.submitted ? this.element(m) : m.parentNode.name in this.submitted && this.element(m.parentNode) }, highlight: function (m, f, a) { d(m).addClass(f).removeClass(a) }, unhighlight: function (m, f, a) { d(m).removeClass(f).addClass(a) }
        }, setDefaults: function (m) { d.extend(d.validator.defaults, m) }, messages: {
            required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.",
            date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", accept: "Please enter a value with a valid extension.", maxlength: d.validator.format("Please enter no more than {0} characters."), minlength: d.validator.format("Please enter at least {0} characters."), rangelength: d.validator.format("Please enter a value between {0} and {1} characters long."),
            range: d.validator.format("Please enter a value between {0} and {1}."), max: d.validator.format("Please enter a value less than or equal to {0}."), min: d.validator.format("Please enter a value greater than or equal to {0}.")
        }, autoCreateRanges: !1, prototype: {
            init: function () {
                function m(e) { var k = d.data(this[0].form, "validator"); e = "on" + e.type.replace(/^validate/, ""); k.settings[e] && k.settings[e].call(k, this[0]) } this.labelContainer = d(this.settings.errorLabelContainer); this.errorContext = this.labelContainer.length &&
                    this.labelContainer || d(this.currentForm); this.containers = d(this.settings.errorContainer).add(this.settings.errorLabelContainer); this.submitted = {}; this.valueCache = {}; this.pendingRequest = 0; this.pending = {}; this.invalid = {}; this.reset(); var f = this.groups = {}; d.each(this.settings.groups, function (e, k) { d.each(k.split(/\s/), function (n, p) { f[p] = e }) }); var a = this.settings.rules; d.each(a, function (e, k) { a[e] = d.validator.normalizeRule(k) }); d(this.currentForm).validateDelegate(":text, :password, :file, select, textarea",
                        "focusin focusout keyup", m).validateDelegate(":radio, :checkbox, select, option", "click", m); this.settings.invalidHandler && d(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            }, form: function () { this.checkForm(); d.extend(this.submitted, this.errorMap); this.invalid = d.extend({}, this.errorMap); this.valid() || d(this.currentForm).triggerHandler("invalid-form", [this]); this.showErrors(); return this.valid() }, checkForm: function () {
                this.prepareForm(); for (var m = 0, f = this.currentElements = this.elements(); f[m]; m++)this.check(f[m]);
                return this.valid()
            }, element: function (m) { this.lastElement = m = this.clean(m); this.prepareElement(m); this.currentElements = d(m); var f = this.check(m); f ? delete this.invalid[m.name] : this.invalid[m.name] = !0; this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)); this.showErrors(); return f }, showErrors: function (m) {
                if (m) {
                    d.extend(this.errorMap, m); this.errorList = []; for (var f in m) this.errorList.push({ message: m[f], element: this.findByName(f)[0] }); this.successList = d.grep(this.successList, function (a) {
                        return !(a.name in
                            m)
                    })
                } this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () { d.fn.resetForm && d(this.currentForm).resetForm(); this.submitted = {}; this.prepareForm(); this.hideErrors(); this.elements().removeClass(this.settings.errorClass) }, numberOfInvalids: function () { return this.objectLength(this.invalid) }, objectLength: function (m) { var f = 0, a; for (a in m) f++; return f }, hideErrors: function () { this.addWrapper(this.toHide).hide() }, valid: function () {
                return 0 ==
                    this.size()
            }, size: function () { return this.errorList.length }, focusInvalid: function () { if (this.settings.focusInvalid) try { d(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (m) { } }, findLastActive: function () { var m = this.lastActive; return m && 1 == d.grep(this.errorList, function (f) { return f.element.name == m.name }).length && m }, elements: function () {
                var m = this, f = {}; return d([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    !this.name &&
                    m.settings.debug && window.console && console.error("%o has no name assigned", this); return this.name in f || !m.objectLength(d(this).rules()) ? !1 : f[this.name] = !0
                })
            }, clean: function (m) { return d(m)[0] }, errors: function () { return d(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext) }, reset: function () { this.successList = []; this.errorList = []; this.errorMap = {}; this.toShow = d([]); this.toHide = d([]); this.currentElements = d([]) }, prepareForm: function () { this.reset(); this.toHide = this.errors().add(this.containers) },
            prepareElement: function (m) { this.reset(); this.toHide = this.errorsFor(m) }, check: function (m) {
                m = this.clean(m); this.checkable(m) && (m = this.findByName(m.name).not(this.settings.ignore)[0]); var f = d(m).rules(), a = !1, e; for (e in f) {
                    var k = { method: e, parameters: f[e] }; try { var n = d.validator.methods[e].call(this, m.value.replace(/\r/g, ""), m, k.parameters); if ("dependency-mismatch" == n) a = !0; else { a = !1; if ("pending" == n) { this.toHide = this.toHide.not(this.errorsFor(m)); return } if (!n) return this.formatAndAdd(m, k), !1 } } catch (p) {
                        throw this.settings.debug &&
                        window.console && console.log("exception occured when checking element " + m.id + ", check the '" + k.method + "' method", p), p;
                    }
                } if (!a) return this.objectLength(f) && this.successList.push(m), !0
            }, customMetaMessage: function (m, f) { if (d.metadata) { var a = this.settings.meta ? d(m).metadata()[this.settings.meta] : d(m).metadata(); return a && a.messages && a.messages[f] } }, customMessage: function (m, f) { var a = this.settings.messages[m]; return a && (a.constructor == String ? a : a[f]) }, findDefined: function () {
                for (var m = 0; m < arguments.length; m++)if (void 0 !==
                    arguments[m]) return arguments[m]
            }, defaultMessage: function (m, f) { return this.findDefined(this.customMessage(m.name, f), this.customMetaMessage(m, f), !this.settings.ignoreTitle && m.title || void 0, d.validator.messages[f], "<strong>Warning: No message defined for " + m.name + "</strong>") }, formatAndAdd: function (m, f) {
                var a = this.defaultMessage(m, f.method), e = /\$?\{(\d+)\}/g; "function" == typeof a ? a = a.call(this, f.parameters, m) : e.test(a) && (a = jQuery.format(a.replace(e, "{$1}"), f.parameters)); this.errorList.push({
                    message: a,
                    element: m
                }); this.errorMap[m.name] = a; this.submitted[m.name] = a
            }, addWrapper: function (m) { this.settings.wrapper && (m = m.add(m.parent(this.settings.wrapper))); return m }, defaultShowErrors: function () {
                for (var m = 0; this.errorList[m]; m++) { var f = this.errorList[m]; this.settings.highlight && this.settings.highlight.call(this, f.element, this.settings.errorClass, this.settings.validClass); this.showLabel(f.element, f.message) } this.errorList.length && (this.toShow = this.toShow.add(this.containers)); if (this.settings.success) for (m =
                    0; this.successList[m]; m++)this.showLabel(this.successList[m]); if (this.settings.unhighlight) for (m = 0, f = this.validElements(); f[m]; m++)this.settings.unhighlight.call(this, f[m], this.settings.errorClass, this.settings.validClass); this.toHide = this.toHide.not(this.toShow); this.hideErrors(); this.addWrapper(this.toShow).show()
            }, validElements: function () { return this.currentElements.not(this.invalidElements()) }, invalidElements: function () { return d(this.errorList).map(function () { return this.element }) }, showLabel: function (m,
                f) {
                    var a = this.errorsFor(m); a.length ? (a.removeClass().addClass(this.settings.errorClass), a.attr("generated") && a.html(f)) : (a = d("<" + this.settings.errorElement + "/>").attr({ "for": this.idOrName(m), generated: !0 }).addClass(this.settings.errorClass).html(f || ""), this.settings.wrapper && (a = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(a).length || (this.settings.errorPlacement ? this.settings.errorPlacement(a, d(m)) : a.insertAfter(m))); !f && this.settings.success && (a.text(""),
                        "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a)); this.toShow = this.toShow.add(a)
            }, errorsFor: function (m) { var f = this.idOrName(m); return this.errors().filter(function () { return d(this).attr("for") == f }) }, idOrName: function (m) { return this.groups[m.name] || (this.checkable(m) ? m.name : m.id || m.name) }, checkable: function (m) { return /radio|checkbox/i.test(m.type) }, findByName: function (m) {
                var f = this.currentForm; return d(document.getElementsByName(m)).map(function (a, e) {
                    return e.form ==
                        f && e.name == m && e || null
                })
            }, getLength: function (m, f) { switch (f.nodeName.toLowerCase()) { case "select": return d("option:selected", f).length; case "input": if (this.checkable(f)) return this.findByName(f.name).filter(":checked").length }return m.length }, depend: function (m, f) { return this.dependTypes[typeof m] ? this.dependTypes[typeof m](m, f) : !0 }, dependTypes: { "boolean": function (m, f) { return m }, string: function (m, f) { return !!d(m, f.form).length }, "function": function (m, f) { return m(f) } }, optional: function (m) {
                return !d.validator.methods.required.call(this,
                    d.trim(m.value), m) && "dependency-mismatch"
            }, startRequest: function (m) { this.pending[m.name] || (this.pendingRequest++, this.pending[m.name] = !0) }, stopRequest: function (m, f) { this.pendingRequest--; 0 > this.pendingRequest && (this.pendingRequest = 0); delete this.pending[m.name]; f && 0 == this.pendingRequest && this.formSubmitted && this.form() ? (d(this.currentForm).submit(), this.formSubmitted = !1) : !f && 0 == this.pendingRequest && this.formSubmitted && (d(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) },
            previousValue: function (m) { return d.data(m, "previousValue") || d.data(m, "previousValue", { old: null, valid: !0, message: this.defaultMessage(m, "remote") }) }
        }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, dateDE: { dateDE: !0 }, number: { number: !0 }, numberDE: { numberDE: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function (m, f) { m.constructor == String ? this.classRuleSettings[m] = f : d.extend(this.classRuleSettings, m) }, classRules: function (m) {
            var f =
                {}; (m = d(m).attr("class")) && d.each(m.split(" "), function () { this in d.validator.classRuleSettings && d.extend(f, d.validator.classRuleSettings[this]) }); return f
        }, attributeRules: function (m) { var f = {}; m = d(m); for (var a in d.validator.methods) { var e = m.attr(a); e && (f[a] = e) } f.maxlength && /-1|2147483647|524288/.test(f.maxlength) && delete f.maxlength; return f }, metadataRules: function (m) { if (!d.metadata) return {}; var f = d.data(m.form, "validator").settings.meta; return f ? d(m).metadata()[f] : d(m).metadata() }, staticRules: function (m) {
            var f =
                {}, a = d.data(m.form, "validator"); a.settings.rules && (f = d.validator.normalizeRule(a.settings.rules[m.name]) || {}); return f
        }, normalizeRules: function (m, f) {
            d.each(m, function (a, e) { if (!1 === e) delete m[a]; else if (e.param || e.depends) { var k = !0; switch (typeof e.depends) { case "string": k = !!d(e.depends, f.form).length; break; case "function": k = e.depends.call(f, f) }k ? m[a] = void 0 !== e.param ? e.param : !0 : delete m[a] } }); d.each(m, function (a, e) { m[a] = d.isFunction(e) ? e(f) : e }); d.each(["minlength", "maxlength", "min", "max"], function () {
                m[this] &&
                (m[this] = Number(m[this]))
            }); d.each(["rangelength", "range"], function () { m[this] && (m[this] = [Number(m[this][0]), Number(m[this][1])]) }); d.validator.autoCreateRanges && (m.min && m.max && (m.range = [m.min, m.max], delete m.min, delete m.max), m.minlength && m.maxlength && (m.rangelength = [m.minlength, m.maxlength], delete m.minlength, delete m.maxlength)); m.messages && delete m.messages; return m
        }, normalizeRule: function (m) { if ("string" == typeof m) { var f = {}; d.each(m.split(/\s/), function () { f[this] = !0 }); m = f } return m }, addMethod: function (m,
            f, a) { d.validator.methods[m] = f; d.validator.messages[m] = void 0 != a ? a : d.validator.messages[m]; 3 > f.length && d.validator.addClassRules(m, d.validator.normalizeRule(m)) }, methods: {
                required: function (m, f, a) { if (!this.depend(a, f)) return "dependency-mismatch"; switch (f.nodeName.toLowerCase()) { case "select": return (m = d(f).val()) && 0 < m.length; case "input": if (this.checkable(f)) return 0 < this.getLength(m, f); default: return 0 < d.trim(m).length } }, remote: function (m, f, a) {
                    if (this.optional(f)) return "dependency-mismatch"; var e = this.previousValue(f);
                    this.settings.messages[f.name] || (this.settings.messages[f.name] = {}); e.originalMessage = this.settings.messages[f.name].remote; this.settings.messages[f.name].remote = e.message; a = "string" == typeof a && { url: a } || a; if (this.pending[f.name]) return "pending"; if (e.old === m) return e.valid; e.old = m; var k = this; this.startRequest(f); var n = {}; n[f.name] = m; d.ajax(d.extend(!0, {
                        url: a, mode: "abort", port: "validate" + f.name, dataType: "json", data: n, success: function (p) {
                            k.settings.messages[f.name].remote = e.originalMessage; var q = !0 ===
                                p; if (q) { var u = k.formSubmitted; k.prepareElement(f); k.formSubmitted = u; k.successList.push(f); k.showErrors() } else u = {}, p = p || k.defaultMessage(f, "remote"), u[f.name] = e.message = d.isFunction(p) ? p(m) : p, k.showErrors(u); e.valid = q; k.stopRequest(f, q)
                        }
                    }, a)); return "pending"
                }, minlength: function (m, f, a) { return this.optional(f) || this.getLength(d.trim(m), f) >= a }, maxlength: function (m, f, a) { return this.optional(f) || this.getLength(d.trim(m), f) <= a }, rangelength: function (m, f, a) {
                    m = this.getLength(d.trim(m), f); return this.optional(f) ||
                        m >= a[0] && m <= a[1]
                }, min: function (m, f, a) { return this.optional(f) || m >= a }, max: function (m, f, a) { return this.optional(f) || m <= a }, range: function (m, f, a) { return this.optional(f) || m >= a[0] && m <= a[1] }, email: function (m, f) { return this.optional(f) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(m) },
                url: function (m, f) { return this.optional(f) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(m) },
                date: function (m, f) { return this.optional(f) || !/Invalid|NaN/.test(new Date(m)) }, dateISO: function (m, f) { return this.optional(f) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(m) }, number: function (m, f) { return this.optional(f) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(m) }, digits: function (m, f) { return this.optional(f) || /^\d+$/.test(m) }, creditcard: function (m, f) {
                    if (this.optional(f)) return "dependency-mismatch"; if (/[^0-9-]+/.test(m)) return !1; var a = 0, e = !1; m = m.replace(/\D/g, ""); for (var k = m.length - 1; 0 <= k; k--) {
                        var n =
                            m.charAt(k); n = parseInt(n, 10); e && 9 < (n *= 2) && (n -= 9); a += n; e = !e
                    } return 0 == a % 10
                }, accept: function (m, f, a) { a = "string" == typeof a ? a.replace(/,/g, "|") : "png|jpe?g|gif"; return this.optional(f) || m.match(new RegExp(".(" + a + ")$", "i")) }, equalTo: function (m, f, a) { a = d(a).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () { d(f).valid() }); return m == a.val() }
            }
    }); d.format = d.validator.format
})(jQuery);
(function (d) { var m = {}; if (d.ajaxPrefilter) d.ajaxPrefilter(function (a, e, k) { e = a.port; "abort" == a.mode && (m[e] && m[e].abort(), m[e] = k) }); else { var f = d.ajax; d.ajax = function (a) { var e = ("port" in a ? a : d.ajaxSettings).port; return "abort" == ("mode" in a ? a : d.ajaxSettings).mode ? (m[e] && m[e].abort(), m[e] = f.apply(this, arguments)) : f.apply(this, arguments) } } })(jQuery);
(function (d) {
    jQuery.event.special.focusin || jQuery.event.special.focusout || !document.addEventListener || d.each({ focus: "focusin", blur: "focusout" }, function (m, f) { function a(e) { e = d.event.fix(e); e.type = f; return d.event.handle.call(this, e) } d.event.special[f] = { setup: function () { this.addEventListener(m, a, !0) }, teardown: function () { this.removeEventListener(m, a, !0) }, handler: function (e) { arguments[0] = d.event.fix(e); arguments[0].type = f; return d.event.handle.apply(this, arguments) } } }); d.extend(d.fn, {
        validateDelegate: function (m,
            f, a) { return this.bind(f, function (e) { var k = d(e.target); if (k.is(m)) return a.apply(k, arguments) }) }
    })
})(jQuery);
(function (d) { "function" === typeof define && define.amd ? define(["jquery"], d) : "object" === typeof module && module.exports ? module.exports = d(require("jquery")) : d(jQuery) })(function (d) {
    d.extend(d.fn, {
        validate: function (a) {
            if (this.length) {
                var e = d.data(this[0], "validator"); if (e) return e; this.attr("novalidate", "novalidate"); e = new d.validator(a, this[0]); d.data(this[0], "validator", e); e.settings.onsubmit && (this.on("click.validate", ":submit", function (k) {
                    e.submitButton = k.currentTarget; d(this).hasClass("cancel") && (e.cancelSubmit =
                        !0); void 0 !== d(this).attr("formnovalidate") && (e.cancelSubmit = !0)
                }), this.on("submit.validate", function (k) {
                    function n() { var p; e.submitButton && (e.settings.submitHandler || e.formSubmitted) && (p = d("<input type='hidden'/>").attr("name", e.submitButton.name).val(d(e.submitButton).val()).appendTo(e.currentForm)); if (e.settings.submitHandler) { var q = e.settings.submitHandler.call(e, e.currentForm, k); p && p.remove(); return void 0 !== q ? q : !1 } return !0 } e.settings.debug && k.preventDefault(); if (e.cancelSubmit) return e.cancelSubmit =
                        !1, n(); if (e.form()) return e.pendingRequest ? (e.formSubmitted = !0, !1) : n(); e.focusInvalid(); return !1
                })); return e
            } a && a.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        }, valid: function () { if (d(this[0]).is("form")) var a = this.validate().form(); else { var e = []; a = !0; var k = d(this[0].form).validate(); this.each(function () { (a = k.element(this) && a) || (e = e.concat(k.errorList)) }); k.errorList = e } return a }, rules: function (a, e) {
            var k = this[0]; if (null != k && (!k.form && k.hasAttribute("contenteditable") &&
                (k.form = this.closest("form")[0], k.name = this.attr("name")), null != k.form)) {
                    if (a) { var n = d.data(k.form, "validator").settings; var p = n.rules; var q = d.validator.staticRules(k); switch (a) { case "add": d.extend(q, d.validator.normalizeRule(e)); delete q.messages; p[k.name] = q; e.messages && (n.messages[k.name] = d.extend(n.messages[k.name], e.messages)); break; case "remove": if (!e) return delete p[k.name], q; var u = {}; d.each(e.split(/\s/), function (x, E) { u[E] = q[E]; delete q[E] }); return u } } k = d.validator.normalizeRules(d.extend({},
                        d.validator.classRules(k), d.validator.attributeRules(k), d.validator.dataRules(k), d.validator.staticRules(k)), k); k.required && (n = k.required, delete k.required, k = d.extend({ required: n }, k)); k.remote && (n = k.remote, delete k.remote, k = d.extend(k, { remote: n })); return k
            }
        }
    }); d.extend(d.expr.pseudos || d.expr[":"], { blank: function (a) { return !d.trim("" + d(a).val()) }, filled: function (a) { a = d(a).val(); return null !== a && !!d.trim("" + a) }, unchecked: function (a) { return !d(a).prop("checked") } }); d.validator = function (a, e) {
        this.settings =
        d.extend(!0, {}, d.validator.defaults, a); this.currentForm = e; this.init()
    }; d.validator.format = function (a, e) { if (1 === arguments.length) return function () { var k = d.makeArray(arguments); k.unshift(a); return d.validator.format.apply(this, k) }; if (void 0 === e) return a; 2 < arguments.length && e.constructor !== Array && (e = d.makeArray(arguments).slice(1)); e.constructor !== Array && (e = [e]); d.each(e, function (k, n) { a = a.replace(new RegExp("\\{" + k + "\\}", "g"), function () { return n }) }); return a }; d.extend(d.validator, {
        defaults: {
            messages: {},
            groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: d([]), errorLabelContainer: d([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function (a) { this.lastActive = a; this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function (a) {
                this.checkable(a) || !(a.name in this.submitted) &&
                    this.optional(a) || this.element(a)
            }, onkeyup: function (a, e) { var k = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]; 9 === e.which && "" === this.elementValue(a) || -1 !== d.inArray(e.keyCode, k) || (a.name in this.submitted || a.name in this.invalid) && this.element(a) }, onclick: function (a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function (a, e, k) { "radio" === a.type ? this.findByName(a.name).addClass(e).removeClass(k) : d(a).addClass(e).removeClass(k) }, unhighlight: function (a,
                e, k) { "radio" === a.type ? this.findByName(a.name).removeClass(e).addClass(k) : d(a).removeClass(e).addClass(k) }
        }, setDefaults: function (a) { d.extend(d.validator.defaults, a) }, messages: {
            required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.",
            maxlength: d.validator.format("Please enter no more than {0} characters."), minlength: d.validator.format("Please enter at least {0} characters."), rangelength: d.validator.format("Please enter a value between {0} and {1} characters long."), range: d.validator.format("Please enter a value between {0} and {1}."), max: d.validator.format("Please enter a value less than or equal to {0}."), min: d.validator.format("Please enter a value greater than or equal to {0}."), step: d.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1, prototype: {
            init: function () {
                function a(n) { !this.form && this.hasAttribute("contenteditable") && (this.form = d(this).closest("form")[0], this.name = d(this).attr("name")); var p = d.data(this.form, "validator"), q = "on" + n.type.replace(/^validate/, ""), u = p.settings; u[q] && !d(this).is(u.ignore) && u[q].call(p, this, n) } this.labelContainer = d(this.settings.errorLabelContainer); this.errorContext = this.labelContainer.length && this.labelContainer || d(this.currentForm); this.containers = d(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {}; this.valueCache = {}; this.pendingRequest = 0; this.pending = {}; this.invalid = {}; this.reset(); var e = this.groups = {}; d.each(this.settings.groups, function (n, p) { "string" === typeof p && (p = p.split(/\s/)); d.each(p, function (q, u) { e[u] = n }) }); var k = this.settings.rules; d.each(k, function (n, p) { k[n] = d.validator.normalizeRule(p) }); d(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",
                    a).on("click.validate", "select, option, [type='radio'], [type='checkbox']", a); if (this.settings.invalidHandler) d(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            }, form: function () { this.checkForm(); d.extend(this.submitted, this.errorMap); this.invalid = d.extend({}, this.errorMap); this.valid() || d(this.currentForm).triggerHandler("invalid-form", [this]); this.showErrors(); return this.valid() }, checkForm: function () {
                this.prepareForm(); for (var a = 0, e = this.currentElements = this.elements(); e[a]; a++)this.check(e[a]);
                return this.valid()
            }, element: function (a) {
                var e = this.clean(a), k = this.validationTargetFor(e), n = this, p = !0, q; if (void 0 === k) delete this.invalid[e.name]; else {
                    this.prepareElement(k); this.currentElements = d(k); (q = this.groups[k.name]) && d.each(this.groups, function (x, E) { E === q && x !== k.name && (e = n.validationTargetFor(n.clean(n.findByName(x)))) && e.name in n.invalid && (n.currentElements.push(e), p = n.check(e) && p) }); var u = !1 !== this.check(k); p = p && u; this.invalid[k.name] = u ? !1 : !0; this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers));
                    this.showErrors(); d(a).attr("aria-invalid", !u)
                } return p
            }, showErrors: function (a) { if (a) { var e = this; d.extend(this.errorMap, a); this.errorList = d.map(this.errorMap, function (k, n) { return { message: k, element: e.findByName(n)[0] } }); this.successList = d.grep(this.successList, function (k) { return !(k.name in a) }) } this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function () {
                d.fn.resetForm && d(this.currentForm).resetForm(); this.invalid = {}; this.submitted =
                    {}; this.prepareForm(); this.hideErrors(); var a = this.elements().removeData("previousValue").removeAttr("aria-invalid"); this.resetElements(a)
            }, resetElements: function (a) { var e; if (this.settings.unhighlight) for (e = 0; a[e]; e++)this.settings.unhighlight.call(this, a[e], this.settings.errorClass, ""), this.findByName(a[e].name).removeClass(this.settings.validClass); else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass) }, numberOfInvalids: function () { return this.objectLength(this.invalid) },
            objectLength: function (a) { var e = 0, k; for (k in a) void 0 !== a[k] && null !== a[k] && !1 !== a[k] && e++; return e }, hideErrors: function () { this.hideThese(this.toHide) }, hideThese: function (a) { a.not(this.containers).text(""); this.addWrapper(a).hide() }, valid: function () { return 0 === this.size() }, size: function () { return this.errorList.length }, focusInvalid: function () { if (this.settings.focusInvalid) try { d(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (a) { } },
            findLastActive: function () { var a = this.lastActive; return a && 1 === d.grep(this.errorList, function (e) { return e.element.name === a.name }).length && a }, elements: function () {
                var a = this, e = {}; return d(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    var k = this.name || d(this).attr("name"); !k && a.settings.debug && window.console && console.error("%o has no name assigned", this); this.hasAttribute("contenteditable") && (this.form =
                        d(this).closest("form")[0], this.name = k); return k in e || !a.objectLength(d(this).rules()) ? !1 : e[k] = !0
                })
            }, clean: function (a) { return d(a)[0] }, errors: function () { var a = this.settings.errorClass.split(" ").join("."); return d(this.settings.errorElement + "." + a, this.errorContext) }, resetInternals: function () { this.successList = []; this.errorList = []; this.errorMap = {}; this.toShow = d([]); this.toHide = d([]) }, reset: function () { this.resetInternals(); this.currentElements = d([]) }, prepareForm: function () {
                this.reset(); this.toHide =
                    this.errors().add(this.containers)
            }, prepareElement: function (a) { this.reset(); this.toHide = this.errorsFor(a) }, elementValue: function (a) {
                var e = d(a), k = a.type; if ("radio" === k || "checkbox" === k) return this.findByName(a.name).filter(":checked").val(); if ("number" === k && "undefined" !== typeof a.validity) return a.validity.badInput ? "NaN" : e.val(); a = a.hasAttribute("contenteditable") ? e.text() : e.val(); if ("file" === k) {
                    if ("C:\\fakepath\\" === a.substr(0, 12)) return a.substr(12); k = a.lastIndexOf("/"); if (0 <= k) return a.substr(k +
                        1); k = a.lastIndexOf("\\"); return 0 <= k ? a.substr(k + 1) : a
                } return "string" === typeof a ? a.replace(/\r/g, "") : a
            }, check: function (a) {
                a = this.validationTargetFor(this.clean(a)); var e = d(a).rules(), k = d.map(e, function (E, z) { return z }).length, n = !1, p = this.elementValue(a), q; if ("function" === typeof e.normalizer) var u = e.normalizer; else "function" === typeof this.settings.normalizer && (u = this.settings.normalizer); if (u) { p = u.call(a, p); if ("string" !== typeof p) throw new TypeError("The normalizer should return a string value."); delete e.normalizer } for (q in e) {
                    u =
                    { method: q, parameters: e[q] }; try { var x = d.validator.methods[q].call(this, p, a, u.parameters); if ("dependency-mismatch" === x && 1 === k) n = !0; else { n = !1; if ("pending" === x) { this.toHide = this.toHide.not(this.errorsFor(a)); return } if (!x) return this.formatAndAdd(a, u), !1 } } catch (E) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + a.id + ", check the '" + u.method + "' method.", E), E instanceof TypeError && (E.message += ".  Exception occurred when checking element " + a.id + ", check the '" +
                            u.method + "' method."), E;
                    }
                } if (!n) return this.objectLength(e) && this.successList.push(a), !0
            }, customDataMessage: function (a, e) { return d(a).data("msg" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()) || d(a).data("msg") }, customMessage: function (a, e) { var k = this.settings.messages[a]; return k && (k.constructor === String ? k : k[e]) }, findDefined: function () { for (var a = 0; a < arguments.length; a++)if (void 0 !== arguments[a]) return arguments[a] }, defaultMessage: function (a, e) {
                "string" === typeof e && (e = { method: e }); var k = this.findDefined(this.customMessage(a.name,
                    e.method), this.customDataMessage(a, e.method), !this.settings.ignoreTitle && a.title || void 0, d.validator.messages[e.method], "<strong>Warning: No message defined for " + a.name + "</strong>"), n = /\$?\{(\d+)\}/g; "function" === typeof k ? k = k.call(this, e.parameters, a) : n.test(k) && (k = d.validator.format(k.replace(n, "{$1}"), e.parameters)); return k
            }, formatAndAdd: function (a, e) { var k = this.defaultMessage(a, e); this.errorList.push({ message: k, element: a, method: e.method }); this.errorMap[a.name] = k; this.submitted[a.name] = k }, addWrapper: function (a) {
                this.settings.wrapper &&
                (a = a.add(a.parent(this.settings.wrapper))); return a
            }, defaultShowErrors: function () {
                var a; for (a = 0; this.errorList[a]; a++) { var e = this.errorList[a]; this.settings.highlight && this.settings.highlight.call(this, e.element, this.settings.errorClass, this.settings.validClass); this.showLabel(e.element, e.message) } this.errorList.length && (this.toShow = this.toShow.add(this.containers)); if (this.settings.success) for (a = 0; this.successList[a]; a++)this.showLabel(this.successList[a]); if (this.settings.unhighlight) for (a = 0, e =
                    this.validElements(); e[a]; a++)this.settings.unhighlight.call(this, e[a], this.settings.errorClass, this.settings.validClass); this.toHide = this.toHide.not(this.toShow); this.hideErrors(); this.addWrapper(this.toShow).show()
            }, validElements: function () { return this.currentElements.not(this.invalidElements()) }, invalidElements: function () { return d(this.errorList).map(function () { return this.element }) }, showLabel: function (a, e) {
                var k, n = this.errorsFor(a), p = this.idOrName(a), q = d(a).attr("aria-describedby"); if (n.length) n.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                    n.html(e); else {
                        var u = n = d("<" + this.settings.errorElement + ">").attr("id", p + "-error").addClass(this.settings.errorClass).html(e || ""); this.settings.wrapper && (u = n.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()); this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, u, d(a)) : u.insertAfter(a); if (n.is("label")) n.attr("for", p); else if (0 === n.parents("label[for='" + this.escapeCssMeta(p) + "']").length && (u = n.attr("id"), q ? q.match(new RegExp("\\b" +
                            this.escapeCssMeta(u) + "\\b")) || (q += " " + u) : q = u, d(a).attr("aria-describedby", q), k = this.groups[a.name])) { var x = this; d.each(x.groups, function (E, z) { z === k && d("[name='" + x.escapeCssMeta(E) + "']", x.currentForm).attr("aria-describedby", n.attr("id")) }) }
                } !e && this.settings.success && (n.text(""), "string" === typeof this.settings.success ? n.addClass(this.settings.success) : this.settings.success(n, a)); this.toShow = this.toShow.add(n)
            }, errorsFor: function (a) {
                var e = this.escapeCssMeta(this.idOrName(a)); a = d(a).attr("aria-describedby");
                e = "label[for='" + e + "'], label[for='" + e + "'] *"; a && (e = e + ", #" + this.escapeCssMeta(a).replace(/\s+/g, ", #")); return this.errors().filter(e)
            }, escapeCssMeta: function (a) { return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1") }, idOrName: function (a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function (a) { this.checkable(a) && (a = this.findByName(a.name)); return d(a).not(this.settings.ignore)[0] }, checkable: function (a) { return /radio|checkbox/i.test(a.type) }, findByName: function (a) {
                return d(this.currentForm).find("[name='" +
                    this.escapeCssMeta(a) + "']")
            }, getLength: function (a, e) { switch (e.nodeName.toLowerCase()) { case "select": return d("option:selected", e).length; case "input": if (this.checkable(e)) return this.findByName(e.name).filter(":checked").length }return a.length }, depend: function (a, e) { return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, e) : !0 }, dependTypes: { "boolean": function (a) { return a }, string: function (a, e) { return !!d(a, e.form).length }, "function": function (a, e) { return a(e) } }, optional: function (a) {
                var e = this.elementValue(a);
                return !d.validator.methods.required.call(this, e, a) && "dependency-mismatch"
            }, startRequest: function (a) { this.pending[a.name] || (this.pendingRequest++, d(a).addClass(this.settings.pendingClass), this.pending[a.name] = !0) }, stopRequest: function (a, e) {
                this.pendingRequest--; 0 > this.pendingRequest && (this.pendingRequest = 0); delete this.pending[a.name]; d(a).removeClass(this.settings.pendingClass); e && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (d(this.currentForm).submit(), this.submitButton && d("input:hidden[name='" +
                    this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !e && 0 === this.pendingRequest && this.formSubmitted && (d(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (a, e) { e = "string" === typeof e && e || "remote"; return d.data(a, "previousValue") || d.data(a, "previousValue", { old: null, valid: !0, message: this.defaultMessage(a, { method: e }) }) }, destroy: function () { this.resetForm(); d(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") }
        },
        classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function (a, e) { a.constructor === String ? this.classRuleSettings[a] = e : d.extend(this.classRuleSettings, a) }, classRules: function (a) { var e = {}; (a = d(a).attr("class")) && d.each(a.split(" "), function () { this in d.validator.classRuleSettings && d.extend(e, d.validator.classRuleSettings[this]) }); return e }, normalizeAttributeRule: function (a,
            e, k, n) { /min|max|step/.test(k) && (null === e || /number|range|text/.test(e)) && (n = Number(n), isNaN(n) && (n = void 0)); n || 0 === n ? a[k] = n : e === k && "range" !== e && (a[k] = !0) }, attributeRules: function (a) { var e = {}, k = d(a), n = a.getAttribute("type"), p; for (p in d.validator.methods) { if ("required" === p) { var q = a.getAttribute(p); "" === q && (q = !0); q = !!q } else q = k.attr(p); this.normalizeAttributeRule(e, n, p, q) } e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength; return e }, dataRules: function (a) {
                var e = {}, k = d(a); a = a.getAttribute("type");
                var n; for (n in d.validator.methods) { var p = k.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()); this.normalizeAttributeRule(e, a, n, p) } return e
            }, staticRules: function (a) { var e = {}, k = d.data(a.form, "validator"); k.settings.rules && (e = d.validator.normalizeRule(k.settings.rules[a.name]) || {}); return e }, normalizeRules: function (a, e) {
                d.each(a, function (k, n) {
                    if (!1 === n) delete a[k]; else if (n.param || n.depends) {
                        var p = !0; switch (typeof n.depends) {
                            case "string": p = !!d(n.depends, e.form).length; break; case "function": p =
                                n.depends.call(e, e)
                        }p ? a[k] = void 0 !== n.param ? n.param : !0 : (d.data(e.form, "validator").resetElements(d(e)), delete a[k])
                    }
                }); d.each(a, function (k, n) { a[k] = d.isFunction(n) && "normalizer" !== k ? n(e) : n }); d.each(["minlength", "maxlength"], function () { a[this] && (a[this] = Number(a[this])) }); d.each(["rangelength", "range"], function () {
                    if (a[this]) if (d.isArray(a[this])) a[this] = [Number(a[this][0]), Number(a[this][1])]; else if ("string" === typeof a[this]) {
                        var k = a[this].replace(/[\[\]]/g, "").split(/[\s,]+/); a[this] = [Number(k[0]),
                        Number(k[1])]
                    }
                }); d.validator.autoCreateRanges && (null != a.min && null != a.max && (a.range = [a.min, a.max], delete a.min, delete a.max), null != a.minlength && null != a.maxlength && (a.rangelength = [a.minlength, a.maxlength], delete a.minlength, delete a.maxlength)); return a
            }, normalizeRule: function (a) { if ("string" === typeof a) { var e = {}; d.each(a.split(/\s/), function () { e[this] = !0 }); a = e } return a }, addMethod: function (a, e, k) {
                d.validator.methods[a] = e; d.validator.messages[a] = void 0 !== k ? k : d.validator.messages[a]; 3 > e.length && d.validator.addClassRules(a,
                    d.validator.normalizeRule(a))
            }, methods: {
                required: function (a, e, k) { return this.depend(k, e) ? "select" === e.nodeName.toLowerCase() ? (a = d(e).val()) && 0 < a.length : this.checkable(e) ? 0 < this.getLength(a, e) : 0 < a.length : "dependency-mismatch" }, email: function (a, e) { return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function (a, e) { return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a) },
                date: function (a, e) { return this.optional(e) || !/Invalid|NaN/.test((new Date(a)).toString()) }, dateISO: function (a, e) { return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function (a, e) { return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function (a, e) { return this.optional(e) || /^\d+$/.test(a) }, minlength: function (a, e, k) { a = d.isArray(a) ? a.length : this.getLength(a, e); return this.optional(e) || a >= k }, maxlength: function (a, e, k) {
                    a =
                    d.isArray(a) ? a.length : this.getLength(a, e); return this.optional(e) || a <= k
                }, rangelength: function (a, e, k) { a = d.isArray(a) ? a.length : this.getLength(a, e); return this.optional(e) || a >= k[0] && a <= k[1] }, min: function (a, e, k) { return this.optional(e) || a >= k }, max: function (a, e, k) { return this.optional(e) || a <= k }, range: function (a, e, k) { return this.optional(e) || a >= k[0] && a <= k[1] }, step: function (a, e, k) {
                    var n = d(e).attr("type"), p = "Step attribute on input type " + n + " is not supported.", q = ["text", "number", "range"], u = new RegExp("\\b" +
                        n + "\\b"), x = function (z) { return (z = ("" + z).match(/(?:\.(\d+))?$/)) ? z[1] ? z[1].length : 0 : 0 }, E = !0; if (n && !u.test(q.join())) throw Error(p); n = x(k); if (x(a) > n || 0 !== Math.round(a * Math.pow(10, n)) % Math.round(k * Math.pow(10, n))) E = !1; return this.optional(e) || E
                }, equalTo: function (a, e, k) { k = d(k); if (this.settings.onfocusout && k.not(".validate-equalTo-blur").length) k.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () { d(e).valid() }); return a === k.val() }, remote: function (a, e, k, n) {
                    if (this.optional(e)) return "dependency-mismatch";
                    n = "string" === typeof n && n || "remote"; var p = this.previousValue(e, n); this.settings.messages[e.name] || (this.settings.messages[e.name] = {}); p.originalMessage = p.originalMessage || this.settings.messages[e.name][n]; this.settings.messages[e.name][n] = p.message; k = "string" === typeof k && { url: k } || k; var q = d.param(d.extend({ data: a }, k.data)); if (p.old === q) return p.valid; p.old = q; var u = this; this.startRequest(e); q = {}; q[e.name] = a; d.ajax(d.extend(!0, {
                        mode: "abort", port: "validate" + e.name, dataType: "json", data: q, context: u.currentForm,
                        success: function (x) { var E = !0 === x || "true" === x; u.settings.messages[e.name][n] = p.originalMessage; if (E) { var z = u.formSubmitted; u.resetInternals(); u.toHide = u.errorsFor(e); u.formSubmitted = z; u.successList.push(e); u.invalid[e.name] = !1; u.showErrors() } else z = {}, x = x || u.defaultMessage(e, { method: n, parameters: a }), z[e.name] = p.message = x, u.invalid[e.name] = !0, u.showErrors(z); p.valid = E; u.stopRequest(e, E) }
                    }, k)); return "pending"
                }
            }
    }); var m = {}; if (d.ajaxPrefilter) d.ajaxPrefilter(function (a, e, k) {
        e = a.port; "abort" === a.mode &&
            (m[e] && m[e].abort(), m[e] = k)
    }); else { var f = d.ajax; d.ajax = function (a) { var e = ("port" in a ? a : d.ajaxSettings).port; return "abort" === ("mode" in a ? a : d.ajaxSettings).mode ? (m[e] && m[e].abort(), m[e] = f.apply(this, arguments), m[e]) : f.apply(this, arguments) } } return d
});
(function (d) { "function" === typeof define && define.amd ? define("jquery.validate.unobtrusive", ["jquery-validation"], d) : "object" === typeof module && module.exports ? module.exports = d(require("jquery-validation")) : jQuery.validator.unobtrusive = d(jQuery) })(function (d) {
    function m(z, H, L) { z.rules[H] = L; z.message && (z.messages[H] = z.message) } function f(z) { return z.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1") } function a(z) { return z.substr(0, z.lastIndexOf(".") + 1) } function e(z, H) {
        0 === z.indexOf("*.") && (z = z.replace("*.",
            H)); return z
    } function k(z, H) { var L = d(this).find("[data-valmsg-for='" + f(H[0].name) + "']"), D = L.attr("data-valmsg-replace"); D = D ? !1 !== d.parseJSON(D) : null; L.removeClass("field-validation-valid").addClass("field-validation-error"); z.data("unobtrusiveContainer", L); D ? (L.empty(), z.removeClass("input-validation-error").appendTo(L)) : z.hide() } function n(z, H) {
        var L = d(this).find("[data-valmsg-summary=true]"), D = L.find("ul"); D && D.length && H.errorList.length && (D.empty(), L.addClass("validation-summary-errors").removeClass("validation-summary-valid"),
            d.each(H.errorList, function () { d("<li />").html(this.message).appendTo(D) }))
    } function p(z) { var H = z.data("unobtrusiveContainer"); if (H) { var L = H.attr("data-valmsg-replace"); L = L ? d.parseJSON(L) : null; H.addClass("field-validation-valid").removeClass("field-validation-error"); z.removeData("unobtrusiveContainer"); L && H.empty() } } function q(z) {
        z = d(this); if (!z.data("__jquery_unobtrusive_validation_form_reset")) {
            z.data("__jquery_unobtrusive_validation_form_reset", !0); try { z.data("validator").resetForm() } finally { z.removeData("__jquery_unobtrusive_validation_form_reset") } z.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            z.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    } function u(z) {
        var H = d(z), L = H.data("unobtrusiveValidation"), D = d.proxy(q, z), M = x.unobtrusive.options || {}, N = function (Y, aa) { var fa = M[Y]; fa && d.isFunction(fa) && fa.apply(z, aa) }; L || (L = {
            options: {
                errorClass: M.errorClass || "input-validation-error", errorElement: M.errorElement || "span", errorPlacement: function () {
                    k.apply(z, arguments);
                    N("errorPlacement", arguments)
                }, invalidHandler: function () { n.apply(z, arguments); N("invalidHandler", arguments) }, messages: {}, rules: {}, success: function () { p.apply(z, arguments); N("success", arguments) }
            }, attachValidation: function () { H.off("reset.unobtrusiveValidation", D).on("reset.unobtrusiveValidation", D).validate(this.options) }, validate: function () { H.validate(); return H.valid() }
        }, H.data("unobtrusiveValidation", L)); return L
    } var x = d.validator; x.unobtrusive = {
        adapters: [], parseElement: function (z, H) {
            var L = d(z),
            D = L.parents("form")[0], M, N; if (D) { var Y = u(D); Y.options.rules[z.name] = M = {}; Y.options.messages[z.name] = N = {}; d.each(this.adapters, function () { var aa = "data-val-" + this.name, fa = L.attr(aa), ka = {}; void 0 !== fa && (aa += "-", d.each(this.params, function () { ka[this] = L.attr(aa + this) }), this.adapt({ element: z, form: D, message: fa, params: ka, rules: M, messages: N })) }); d.extend(M, { __dummy__: !0 }); H || Y.attachValidation() }
        }, parse: function (z) {
            z = d(z); var H = z.parents().addBack().filter("form").add(z.find("form")).has("[data-val=true]");
            z.find("[data-val=true]").each(function () { x.unobtrusive.parseElement(this, !0) }); H.each(function () { var L = u(this); L && L.attachValidation() })
        }
    }; var E = x.unobtrusive.adapters; E.add = function (z, H, L) { L || (L = H, H = []); this.push({ name: z, params: H, adapt: L }); return this }; E.addBool = function (z, H) { return this.add(z, function (L) { m(L, H || z, !0) }) }; E.addMinMax = function (z, H, L, D, M, N) { return this.add(z, [M || "min", N || "max"], function (Y) { var aa = Y.params.min, fa = Y.params.max; aa && fa ? m(Y, D, [aa, fa]) : aa ? m(Y, H, aa) : fa && m(Y, L, fa) }) }; E.addSingleVal =
        function (z, H, L) { return this.add(z, [H || "val"], function (D) { m(D, L || z, D.params[H]) }) }; x.addMethod("__dummy__", function (z, H, L) { return !0 }); x.addMethod("regex", function (z, H, L) { return this.optional(H) ? !0 : (H = (new RegExp(L)).exec(z)) && 0 === H.index && H[0].length === z.length }); x.addMethod("nonalphamin", function (z, H, L) { if (L) var D = (D = z.match(/\W/g)) && D.length >= L; return D }); x.methods.extension ? (E.addSingleVal("accept", "mimtype"), E.addSingleVal("extension", "extension")) : E.addSingleVal("extension", "extension", "accept");
    E.addSingleVal("regex", "pattern"); E.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"); E.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range"); E.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength"); E.add("equalto", ["other"], function (z) { var H = a(z.element.name); H = e(z.params.other, H); H = d(z.form).find(":input").filter("[name='" + f(H) + "']")[0]; m(z, "equalTo", H) }); E.add("required",
        function (z) { "INPUT" === z.element.tagName.toUpperCase() && "CHECKBOX" === z.element.type.toUpperCase() || m(z, "required", !0) }); E.add("remote", ["url", "type", "additionalfields"], function (z) {
            var H = { url: z.params.url, type: z.params.type || "GET", data: {} }, L = a(z.element.name); d.each((z.params.additionalfields || z.element.name).replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g), function (D, M) {
                var N = e(M, L); H.data[N] = function () {
                    var Y = d(z.form).find(":input").filter("[name='" + f(N) + "']"); return Y.is(":checkbox") ? Y.filter(":checked").val() ||
                        Y.filter(":hidden").val() || "" : Y.is(":radio") ? Y.filter(":checked").val() || "" : Y.val()
                }
            }); m(z, "remote", H)
        }); E.add("password", ["min", "nonalphamin", "regex"], function (z) { z.params.min && m(z, "minlength", z.params.min); z.params.nonalphamin && m(z, "nonalphamin", z.params.nonalphamin); z.params.regex && m(z, "regex", z.params.regex) }); E.add("fileextensions", ["extensions"], function (z) { m(z, "extension", z.params.extensions) }); d(function () { x.unobtrusive.parse(document) }); return x.unobtrusive
});
(function (d) {
    function m(f) { return (f || "").toLowerCase() } d.fn.cycle = function (f) {
        if (0 === this.length && !d.isReady) { var a = this.selector; var e = this.context; d.fn.cycle.log("requeuing slideshow (dom not ready)"); d(function () { d(a, e).cycle(f) }); return this } return this.each(function () {
            var k = d(this), n = d.fn.cycle.log; if (!k.data("cycle.opts")) {
                if (!1 === k.data("cycle-log") || f && !1 === f.log || E && !1 === E.log) n = d.noop; n("--c2 init--"); var p = k.data(); for (var q in p) if (p.hasOwnProperty(q) && /^cycle[A-Z]+/.test(q)) {
                    var u = p[q];
                    var x = q.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, m); n(x + ":", u, "(" + typeof u + ")"); p[x] = u
                } var E = d.extend({}, d.fn.cycle.defaults, p, f || {}); E.timeoutId = 0; E.paused = E.paused || !1; E.container = k; E._maxZ = E.maxZ; E.API = d.extend({ _container: k }, d.fn.cycle.API); E.API.log = n; E.API.trigger = function (z, H) { E.container.trigger(z, H); return E.API }; k.data("cycle.opts", E); k.data("cycle.API", E.API); E.API.trigger("cycle-bootstrap", [E, E.API]); E.API.addInitialSlides(); E.API.preInitSlideshow(); E.slides.length && E.API.initSlideshow()
            }
        })
    };
    d.fn.cycle.API = {
        opts: function () { return this._container.data("cycle.opts") }, addInitialSlides: function () { var f = this.opts(), a = f.slides; f.slideCount = 0; f.slides = d(); a = a.jquery ? a : f.container.find(a); f.random && a.sort(function () { return Math.random() - .5 }); f.API.add(a) }, preInitSlideshow: function () { var f = this.opts(); f.API.trigger("cycle-pre-initialize", [f]); var a = d.fn.cycle.transitions[f.fx]; a && d.isFunction(a.preInit) && a.preInit(f); f._preInitialized = !0 }, postInitSlideshow: function () {
            var f = this.opts(); f.API.trigger("cycle-post-initialize",
                [f]); var a = d.fn.cycle.transitions[f.fx]; a && d.isFunction(a.postInit) && a.postInit(f)
        }, initSlideshow: function () {
            var f = this.opts(), a = f.container; f.API.calcFirstSlide(); "static" == f.container.css("position") && f.container.css("position", "relative"); d(f.slides[f.currSlide]).css("opacity", 1).show(); f.API.stackSlides(f.slides[f.currSlide], f.slides[f.nextSlide], !f.reverse); f.pauseOnHover && (!0 !== f.pauseOnHover && (a = d(f.pauseOnHover)), a.hover(function () { f.API.pause(!0) }, function () { f.API.resume(!0) })); f.timeout &&
                (a = f.API.getSlideOpts(f.currSlide), f.API.queueTransition(a, a.timeout + f.delay)); f._initialized = !0; f.API.updateView(!0); f.API.trigger("cycle-initialized", [f]); f.API.postInitSlideshow()
        }, pause: function (f) {
            var a = this.opts(), e = a.API.getSlideOpts(), k = a.hoverPaused || a.paused; f ? a.hoverPaused = !0 : a.paused = !0; !k && (a.container.addClass("cycle-paused"), a.API.trigger("cycle-paused", [a]).log("cycle-paused"), e.timeout && (clearTimeout(a.timeoutId), a.timeoutId = 0, a._remainingTimeout -= d.now() - a._lastQueue, 0 > a._remainingTimeout ||
                isNaN(a._remainingTimeout))) && (a._remainingTimeout = void 0)
        }, resume: function (f) { var a = this.opts(), e = !a.hoverPaused && !a.paused; f ? a.hoverPaused = !1 : a.paused = !1; e || (a.container.removeClass("cycle-paused"), 0 === a.slides.filter(":animated").length && a.API.queueTransition(a.API.getSlideOpts(), a._remainingTimeout), a.API.trigger("cycle-resumed", [a, a._remainingTimeout]).log("cycle-resumed")) }, add: function (f, a) {
            var e = this.opts(), k = e.slideCount, n = !1; "string" == d.type(f) && (f = d.trim(f)); d(f).each(function (p) {
                var q =
                    d(this); a ? e.container.prepend(q) : e.container.append(q); e.slideCount++; p = e.API.buildSlideOpts(q); e.slides = a ? d(q).add(e.slides) : e.slides.add(q); e.API.initSlide(p, q, --e._maxZ); q.data("cycle.opts", p); e.API.trigger("cycle-slide-added", [e, p, q])
            }); e.API.updateView(!0); if (n = e._preInitialized && 2 > k && 1 <= e.slideCount) e._initialized ? e.timeout && (k = e.slides.length, e.nextSlide = e.reverse ? k - 1 : 1, e.timeoutId || e.API.queueTransition(e)) : e.API.initSlideshow()
        }, calcFirstSlide: function () {
            var f = this.opts(); var a = parseInt(f.startingSlide ||
                0, 10); if (a >= f.slides.length || 0 > a) a = 0; f.currSlide = a; f.reverse ? (f.nextSlide = a - 1, 0 > f.nextSlide && (f.nextSlide = f.slides.length - 1)) : (f.nextSlide = a + 1, f.nextSlide == f.slides.length && (f.nextSlide = 0))
        }, calcNextSlide: function () { var f = this.opts(); if (f.reverse) { var a = 0 > f.nextSlide - 1; f.nextSlide = a ? f.slideCount - 1 : f.nextSlide - 1; f.currSlide = a ? 0 : f.nextSlide + 1 } else a = f.nextSlide + 1 == f.slides.length, f.nextSlide = a ? 0 : f.nextSlide + 1, f.currSlide = a ? f.slides.length - 1 : f.nextSlide - 1 }, calcTx: function (f, a) {
            var e; a && f.manualFx && (e =
                d.fn.cycle.transitions[f.manualFx]); e || (e = d.fn.cycle.transitions[f.fx]); e || (e = d.fn.cycle.transitions.fade, f.API.log('Transition "' + f.fx + '" not found.  Using fade.')); return e
        }, prepareTx: function (f, a) {
            var e = this.opts(); if (2 > e.slideCount) e.timeoutId = 0; else if (!f || e.busy && !e.manualTrump || (e.API.stopTransition(), e.busy = !1, clearTimeout(e.timeoutId), e.timeoutId = 0), !e.busy && (0 !== e.timeoutId || f)) {
                var k = e.slides[e.currSlide]; var n = e.slides[e.nextSlide]; var p = e.API.getSlideOpts(e.nextSlide); var q = e.API.calcTx(p,
                    f); e._tx = q; f && void 0 !== p.manualSpeed && (p.speed = p.manualSpeed); if (e.nextSlide != e.currSlide && (f || !e.paused && !e.hoverPaused && e.timeout)) { e.API.trigger("cycle-before", [p, k, n, a]); q.before && q.before(p, k, n, a); var u = function () { e.busy = !1; e.container.data("cycle.opts") && (q.after && q.after(p, k, n, a), e.API.trigger("cycle-after", [p, k, n, a]), e.API.queueTransition(p), e.API.updateView(!0)) }; e.busy = !0; q.transition ? q.transition(p, k, n, a, u) : e.API.doTransition(p, k, n, a, u); e.API.calcNextSlide(); e.API.updateView() } else e.API.queueTransition(p)
            }
        },
        doTransition: function (f, a, e, k, n) { var p = d(a), q = d(e), u = function () { q.animate(f.animIn || { opacity: 1 }, f.speed, f.easeIn || f.easing, n) }; q.css(f.cssBefore || {}); p.animate(f.animOut || {}, f.speed, f.easeOut || f.easing, function () { p.css(f.cssAfter || {}); f.sync || u() }); f.sync && u() }, queueTransition: function (f, a) {
            var e = this.opts(), k = void 0 !== a ? a : f.timeout; 0 === e.nextSlide && 0 === --e.loop ? (e.API.log("terminating; loop=0"), e.timeout = 0, k ? setTimeout(function () { e.API.trigger("cycle-finished", [e]) }, k) : e.API.trigger("cycle-finished",
                [e]), e.nextSlide = e.currSlide) : k && (e._lastQueue = d.now(), void 0 === a && (e._remainingTimeout = f.timeout), e.paused || e.hoverPaused || (e.timeoutId = setTimeout(function () { e.API.prepareTx(!1, !e.reverse) }, k)))
        }, stopTransition: function () { var f = this.opts(); f.slides.filter(":animated").length && (f.slides.stop(!1, !0), f.API.trigger("cycle-transition-stopped", [f])); f._tx && f._tx.stopTransition && f._tx.stopTransition(f) }, advanceSlide: function (f) {
            var a = this.opts(); clearTimeout(a.timeoutId); a.timeoutId = 0; a.nextSlide = a.currSlide +
                f; 0 > a.nextSlide ? a.nextSlide = a.slides.length - 1 : a.nextSlide >= a.slides.length && (a.nextSlide = 0); a.API.prepareTx(!0, 0 <= f); return !1
        }, buildSlideOpts: function (f) {
            var a = this.opts(), e = f.data() || {}, k; for (k in e) if (e.hasOwnProperty(k) && /^cycle[A-Z]+/.test(k)) { f = e[k]; var n = k.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, m); a.API.log("[" + (a.slideCount - 1) + "]", n + ":", f, "(" + typeof f + ")"); e[n] = f } e = d.extend({}, d.fn.cycle.defaults, a, e); e.slideNum = a.slideCount; try {
                delete e.API, delete e.slideCount, delete e.currSlide, delete e.nextSlide,
                delete e.slides
            } catch (p) { } return e
        }, getSlideOpts: function (f) { var a = this.opts(); void 0 === f && (f = a.currSlide); f = d(a.slides[f]).data("cycle.opts"); return d.extend({}, a, f) }, initSlide: function (f, a, e) { var k = this.opts(); a.css(f.slideCss || {}); 0 < e && a.css("zIndex", e); isNaN(f.speed) && (f.speed = d.fx.speeds[f.speed] || d.fx.speeds._default); f.sync || (f.speed /= 2); a.addClass(k.slideClass) }, updateView: function (f, a) {
            var e = this.opts(); if (e._initialized) {
                var k = e.API.getSlideOpts(), n = e.slides[e.currSlide]; if (!f && !0 !== a &&
                    (e.API.trigger("cycle-update-view-before", [e, k, n]), 0 > e.updateView)) return; e.slideActiveClass && e.slides.removeClass(e.slideActiveClass).eq(e.currSlide).addClass(e.slideActiveClass); f && e.hideNonActive && e.slides.filter(":not(." + e.slideActiveClass + ")").hide(); 0 === e.updateView && setTimeout(function () { e.API.trigger("cycle-update-view", [e, k, n, f]) }, k.speed / (e.sync ? 2 : 1)); 0 !== e.updateView && e.API.trigger("cycle-update-view", [e, k, n, f]); f && e.API.trigger("cycle-update-view-after", [e, k, n])
            }
        }, getComponent: function (f) {
            var a =
                this.opts(); f = a[f]; return "string" === typeof f ? /^\s*[>|\+|~]/.test(f) ? a.container.find(f) : d(f) : f.jquery ? f : d(f)
        }, stackSlides: function (f, a, e) {
            var k = this.opts(); f || (f = k.slides[k.currSlide], a = k.slides[k.nextSlide], e = !k.reverse); d(f).css("zIndex", k.maxZ); f = k.maxZ - 2; var n = k.slideCount; if (e) { for (e = k.currSlide + 1; e < n; e++)d(k.slides[e]).css("zIndex", f--); for (e = 0; e < k.currSlide; e++)d(k.slides[e]).css("zIndex", f--) } else {
                for (e = k.currSlide - 1; 0 <= e; e--)d(k.slides[e]).css("zIndex", f--); for (e = n - 1; e > k.currSlide; e--)d(k.slides[e]).css("zIndex",
                    f--)
            } d(a).css("zIndex", k.maxZ - 1)
        }, getSlideIndex: function (f) { return this.opts().slides.index(f) }
    }; d.fn.cycle.log = function () { window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " ")) }; d.fn.cycle.version = function () { return "Cycle2: 20131003" }; d.fn.cycle.transitions = {
        custom: {}, none: { before: function (f, a, e, k) { f.API.stackSlides(e, a, k); f.cssBefore = { opacity: 1, display: "block" } } }, fade: {
            before: function (f, a, e, k) {
                var n = f.API.getSlideOpts(f.nextSlide).slideCss || {}; f.API.stackSlides(a,
                    e, k); f.cssBefore = d.extend(n, { opacity: 0, display: "block" }); f.animIn = { opacity: 1 }; f.animOut = { opacity: 0 }
            }
        }, fadeout: { before: function (f, a, e, k) { var n = f.API.getSlideOpts(f.nextSlide).slideCss || {}; f.API.stackSlides(a, e, k); f.cssBefore = d.extend(n, { opacity: 1, display: "block" }); f.animOut = { opacity: 0 } } }, scrollHorz: {
            before: function (f, a, e, k) {
                f.API.stackSlides(a, e, k); a = f.container.css("overflow", "hidden").width(); f.cssBefore = { left: k ? a : -a, top: 0, opacity: 1, display: "block" }; f.cssAfter = { zIndex: f._maxZ - 2, left: 0 }; f.animIn =
                    { left: 0 }; f.animOut = { left: k ? -a : a }
            }
        }
    }; d.fn.cycle.defaults = { allowWrap: !0, autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]", delay: 0, easing: null, fx: "fade", hideNonActive: !0, loop: 0, manualFx: void 0, manualSpeed: void 0, manualTrump: !0, maxZ: 100, pauseOnHover: !1, reverse: !1, slideActiveClass: "cycle-slide-active", slideClass: "cycle-slide", slideCss: { position: "absolute", top: 0, left: 0 }, slides: "> img", speed: 500, startingSlide: 0, sync: !0, timeout: 4E3, updateView: 0 }; d(document).ready(function () { d(d.fn.cycle.defaults.autoSelector).cycle() })
})(jQuery);
(function (d) {
    function m(k, n) {
        var p = n.autoHeight; if ("container" == p) p = d(n.slides[n.currSlide]).outerHeight(), n.container.height(p); else if (n._autoHeightRatio) n.container.height(n.container.width() / n._autoHeightRatio); else if ("calc" === p || "number" == d.type(p) && 0 <= p) p = "calc" === p ? f(k, n) : p >= n.slides.length ? 0 : p, p != n._sentinelIndex && (n._sentinelIndex = p, n._sentinel && n._sentinel.remove(), p = d(n.slides[p].cloneNode(!0)), p.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), p.css({
            position: "static",
            visibility: "hidden", display: "block"
        }).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), p.find("*").css("visibility", "hidden"), n._sentinel = p)
    } function f(k, n) { var p = 0, q = -1; n.slides.each(function (u) { var x = d(this).height(); x > q && (q = x, p = u) }); return p } function a(k, n, p, q, u) { k = d(q).outerHeight(); n.container.animate({ height: k }, n.sync ? n.speed / 2 : n.speed) } function e(k, n) {
        n._autoHeightOnResize && (d(window).off("resize orientationchange", n._autoHeightOnResize), n._autoHeightOnResize =
            null); n.container.off("cycle-slide-added cycle-slide-removed", m); n.container.off("cycle-destroyed", e); n.container.off("cycle-before", a); n._sentinel && (n._sentinel.remove(), n._sentinel = null)
    } d.extend(d.fn.cycle.defaults, { autoHeight: 0 }); d(document).on("cycle-initialized", function (k, n) {
        function p() { m(k, n) } var q = n.autoHeight, u = d.type(q), x = null; if ("string" === u || "number" === u) {
            n.container.on("cycle-slide-added cycle-slide-removed", m); n.container.on("cycle-destroyed", e); if ("container" == q) n.container.on("cycle-before",
                a); else "string" === u && /\d+:\d+/.test(q) && (q = q.match(/(\d+):(\d+)/), q = q[1] / q[2], n._autoHeightRatio = q); "number" !== u && (n._autoHeightOnResize = function () { clearTimeout(x); x = setTimeout(p, 50) }, d(window).on("resize orientationchange", n._autoHeightOnResize)); setTimeout(p, 30)
        }
    })
})(jQuery);
(function (d) {
    d.extend(d.fn.cycle.defaults, { caption: "> .cycle-caption", captionTemplate: "{{slideNum}} / {{slideCount}}", overlay: "> .cycle-overlay", overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>", captionModule: "caption" }); d(document).on("cycle-update-view", function (m, f, a, e) { "caption" === f.captionModule && d.each(["caption", "overlay"], function () { var k = a[this + "Template"], n = f.API.getComponent(this); n.length && k ? (n.html(f.API.tmpl(k, a, f, e)), n.show()) : n.hide() }) }); d(document).on("cycle-destroyed", function (m,
        f) { var a; d.each(["caption", "overlay"], function () { var e = f[this + "Template"]; f[this] && e && (a = f.API.getComponent("caption"), a.empty()) }) })
})(jQuery);
(function (d) {
    var m = d.fn.cycle; d.fn.cycle = function (f) { var a, e, k, n = d.makeArray(arguments); return "number" == d.type(f) ? this.cycle("goto", f) : "string" == d.type(f) ? this.each(function () { a = f; k = d(this).data("cycle.opts"); if (void 0 === k) m.log('slideshow must be initialized before sending commands; "' + a + '" ignored'); else { a = "goto" == a ? "jump" : a; e = k.API[a]; if (d.isFunction(e)) { var p = d.makeArray(n); p.shift(); return e.apply(k.API, p) } m.log("unknown command: ", a) } }) : m.apply(this, arguments) }; d.extend(d.fn.cycle, m); d.extend(m.API,
        {
            next: function () { var f = this.opts(); if (!f.busy || f.manualTrump) { var a = f.reverse ? -1 : 1; !1 === f.allowWrap && f.currSlide + a >= f.slideCount || (f.API.advanceSlide(a), f.API.trigger("cycle-next", [f]).log("cycle-next")) } }, prev: function () { var f = this.opts(); if (!f.busy || f.manualTrump) { var a = f.reverse ? 1 : -1; !1 === f.allowWrap && 0 > f.currSlide + a || (f.API.advanceSlide(a), f.API.trigger("cycle-prev", [f]).log("cycle-prev")) } }, destroy: function () {
                this.stop(); var f = this.opts(), a = d.isFunction(d._data) ? d._data : d.noop; clearTimeout(f.timeoutId);
                f.timeoutId = 0; f.API.stop(); f.API.trigger("cycle-destroyed", [f]).log("cycle-destroyed"); f.container.removeData(); a(f.container[0], "parsedAttrs", !1); f.retainStylesOnDestroy || (f.container.removeAttr("style"), f.slides.removeAttr("style"), f.slides.removeClass(f.slideActiveClass)); f.slides.each(function () { d(this).removeData(); a(this, "parsedAttrs", !1) })
            }, jump: function (f) {
                var a = this.opts(); if (!a.busy || a.manualTrump) f = parseInt(f, 10), isNaN(f) || 0 > f || f >= a.slides.length ? a.API.log("goto: invalid slide index: " +
                    f) : f == a.currSlide ? a.API.log("goto: skipping, already on slide", f) : (a.nextSlide = f, clearTimeout(a.timeoutId), a.timeoutId = 0, a.API.log("goto: ", f, " (zero-index)"), a.API.prepareTx(!0, a.currSlide < a.nextSlide))
            }, stop: function () { var f = this.opts(), a = f.container; clearTimeout(f.timeoutId); f.timeoutId = 0; f.API.stopTransition(); f.pauseOnHover && (!0 !== f.pauseOnHover && (a = d(f.pauseOnHover)), a.off("mouseenter mouseleave")); f.API.trigger("cycle-stopped", [f]).log("cycle-stopped") }, reinit: function () {
                var f = this.opts();
                f.API.destroy(); f.container.cycle()
            }, remove: function (f) { for (var a = this.opts(), e, k, n = [], p = 1, q = 0; q < a.slides.length; q++)e = a.slides[q], q == f ? k = e : (n.push(e), d(e).data("cycle.opts").slideNum = p, p++); k && (a.slides = d(n), a.slideCount--, d(k).remove(), f == a.currSlide ? a.API.advanceSlide(1) : f < a.currSlide ? a.currSlide-- : a.currSlide++, a.API.trigger("cycle-slide-removed", [a, f, k]).log("cycle-slide-removed"), a.API.updateView()) }
        }); d(document).on("click.cycle", "[data-cycle-cmd]", function (f) {
            f.preventDefault(); f = d(this);
            var a = f.data("cycle-cmd"), e = f.data("cycle-context") || ".cycle-slideshow"; d(e).cycle(a, f.data("cycle-arg"))
        })
})(jQuery);
(function (d) {
    function m(f, a) { if (f._hashFence) f._hashFence = !1; else { var e = window.location.hash.substring(1); f.slides.each(function (k) { if (d(this).data("cycle-hash") == e) { if (!0 === a) f.startingSlide = k; else { var n = f.currSlide < k; f.nextSlide = k; f.API.prepareTx(!0, n) } return !1 } }) } } d(document).on("cycle-pre-initialize", function (f, a) { m(a, !0); a._onHashChange = function () { m(a, !1) }; d(window).on("hashchange", a._onHashChange) }); d(document).on("cycle-update-view", function (f, a, e) {
        e.hash && "#" + e.hash != window.location.hash &&
        (a._hashFence = !0, window.location.hash = e.hash)
    }); d(document).on("cycle-destroyed", function (f, a) { a._onHashChange && d(window).off("hashchange", a._onHashChange) })
})(jQuery);
(function (d) {
    d.extend(d.fn.cycle.defaults, { loader: !1 }); d(document).on("cycle-bootstrap", function (m, f) {
        if (f.loader) {
            var a = f.API.add; f.API.add = function (e, k) {
                function n(x, E) { return x.data("index") - E.data("index") } var p = []; if ("string" == d.type(e)) e = d.trim(e); else if ("array" === d.type(e)) for (var q = 0; q < e.length; q++)e[q] = d(e[q])[0]; e = d(e); var u = e.length; u && (f.eventualSlideCount = f.slideCount + u, e.hide().appendTo("body").each(function (x) {
                    function E() {
                        if (0 === --z) {
                            --u; var D = H; if ("wait" == f.loader) p.push(D), 0 ===
                                u && (p.sort(n), a.apply(f.API, [p, k]), f.container.removeClass("cycle-loading")); else { var M = d(f.slides[f.currSlide]); a.apply(f.API, [D, k]); M.show(); f.container.removeClass("cycle-loading") }
                        }
                    } var z = 0, H = d(this), L = H.is("img") ? H : H.find("img"); H.data("index", x); L = L.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'); L.length ? (z = L.length, L.each(function () {
                        this.complete ? E() : d(this).load(function () { E() }).error(function () {
                            0 === --z && (f.API.log("slide skipped; img not loaded:", this.src), 0 === --u && "wait" ==
                                f.loader && a.apply(f.API, [p, k]))
                        })
                    })) : (--u, p.push(H))
                }), u && f.container.addClass("cycle-loading"))
            }
        }
    })
})(jQuery);
(function (d) {
    function m(a, e, k) { var n; a.API.getComponent("pager").each(function () { var p = d(this); if (e.pagerTemplate) { var q = a.API.tmpl(e.pagerTemplate, e, a, k[0]); n = d(q).appendTo(p) } else n = p.children().eq(a.slideCount - 1); n.on(a.pagerEvent, function (u) { u.preventDefault(); a.API.page(p, u.currentTarget) }) }) } function f(a, e) { var k = this.opts(); if (!k.busy || k.manualTrump) { var n = a.children().index(e), p = k.currSlide < n; k.currSlide != n && (k.nextSlide = n, k.API.prepareTx(!0, p), k.API.trigger("cycle-pager-activated", [k, a, e])) } }
    d.extend(d.fn.cycle.defaults, { pager: "> .cycle-pager", pagerActiveClass: "cycle-pager-active", pagerEvent: "click.cycle", pagerTemplate: "<span>&bull;</span>" }); d(document).on("cycle-bootstrap", function (a, e, k) { k.buildPagerLink = m }); d(document).on("cycle-slide-added", function (a, e, k, n) { e.pager && (e.API.buildPagerLink(e, k, n), e.API.page = f) }); d(document).on("cycle-slide-removed", function (a, e, k, n) { e.pager && e.API.getComponent("pager").each(function () { var p = d(this); d(p.children()[k]).remove() }) }); d(document).on("cycle-update-view",
        function (a, e, k) { e.pager && (a = e.API.getComponent("pager"), a.each(function () { d(this).children().removeClass(e.pagerActiveClass).eq(e.currSlide).addClass(e.pagerActiveClass) })) }); d(document).on("cycle-destroyed", function (a, e) { var k = e.API.getComponent("pager"); k && (k.children().off(e.pagerEvent), e.pagerTemplate && k.empty()) })
})(jQuery);
(function (d) {
    d.extend(d.fn.cycle.defaults, { next: "> .cycle-next", nextEvent: "click.cycle", disabledClass: "disabled", prev: "> .cycle-prev", prevEvent: "click.cycle", swipe: !1 }); d(document).on("cycle-initialized", function (m, f) {
        f.API.getComponent("next").on(f.nextEvent, function (e) { e.preventDefault(); f.API.next() }); f.API.getComponent("prev").on(f.prevEvent, function (e) { e.preventDefault(); f.API.prev() }); if (f.swipe) {
            var a = f.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle"; f.container.on(f.swipeVert ?
                "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle", function (e) { f.API.next() }); f.container.on(a, function () { f.API.prev() })
        }
    }); d(document).on("cycle-update-view", function (m, f, a, e) {
        if (!f.allowWrap) {
            m = f.disabledClass; a = f.API.getComponent("next"); e = f.API.getComponent("prev"); var k = f._prevBoundry || 0; f.currSlide == (void 0 !== f._nextBoundry ? f._nextBoundry : f.slideCount - 1) ? a.addClass(m).prop("disabled", !0) : a.removeClass(m).prop("disabled", !1); f.currSlide === k ? e.addClass(m).prop("disabled", !0) : e.removeClass(m).prop("disabled",
                !1)
        }
    }); d(document).on("cycle-destroyed", function (m, f) { f.API.getComponent("prev").off(f.nextEvent); f.API.getComponent("next").off(f.prevEvent); f.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle") })
})(jQuery);
(function (d) {
    d.extend(d.fn.cycle.defaults, { progressive: !1 }); d(document).on("cycle-pre-initialize", function (m, f) {
        if (f.progressive) {
            var a = f.API, e = a.next, k = a.prev, n = a.prepareTx, p = d.type(f.progressive); if ("array" == p) var q = f.progressive; else if (d.isFunction(f.progressive)) q = f.progressive(f); else if ("string" == p) {
                p = d(f.progressive); q = d.trim(p.html()); if (!q) return; if (/^(\[)/.test(q)) try { q = d.parseJSON(q) } catch (u) { a.log("error parsing progressive slides", u); return } else q = q.split(new RegExp(p.data("cycle-split") ||
                    "\n")), q[q.length - 1] || q.pop()
            } n && (a.prepareTx = function (u, x) { if (u || 0 === q.length) n.apply(f.API, [u, x]); else if (x && f.currSlide == f.slideCount - 1) { var E = q[0]; q = q.slice(1); f.container.one("cycle-slide-added", function (H, L) { setTimeout(function () { L.API.advanceSlide(1) }, 50) }); f.API.add(E) } else if (x || 0 !== f.currSlide) n.apply(f.API, [u, x]); else { var z = q.length - 1; E = q[z]; q = q.slice(0, z); f.container.one("cycle-slide-added", function (H, L) { setTimeout(function () { L.currSlide = 1; L.API.advanceSlide(-1) }, 50) }); f.API.add(E, !0) } });
            e && (a.next = function () { var u = this.opts(); if (q.length && u.currSlide == u.slideCount - 1) { var x = q[0]; q = q.slice(1); u.container.one("cycle-slide-added", function (E, z) { e.apply(z.API); z.container.removeClass("cycle-loading") }); u.container.addClass("cycle-loading"); u.API.add(x) } else e.apply(u.API) }); k && (a.prev = function () {
                var u = this.opts(); if (q.length && 0 === u.currSlide) {
                    var x = q.length - 1, E = q[x]; q = q.slice(0, x); u.container.one("cycle-slide-added", function (z, H) { H.currSlide = 1; H.API.advanceSlide(-1); H.container.removeClass("cycle-loading") });
                    u.container.addClass("cycle-loading"); u.API.add(E, !0)
                } else k.apply(u.API)
            })
        }
    })
})(jQuery);
(function (d) { d.extend(d.fn.cycle.defaults, { tmplRegex: "{{((.)?.*?)}}" }); d.extend(d.fn.cycle.API, { tmpl: function (m, f) { var a = new RegExp(f.tmplRegex || d.fn.cycle.defaults.tmplRegex, "g"), e = d.makeArray(arguments); e.shift(); return m.replace(a, function (k, n) { var p, q, u, x = n.split("."); for (p = 0; p < e.length; p++)if (u = e[p]) { if (1 < x.length) { var E = u; for (q = 0; q < x.length; q++)u = E, E = E[x[q]] || n } else E = u[n]; if (d.isFunction(E)) return E.apply(u, e); if (void 0 !== E && null !== E && E != n) return E } return n }) } }) })(jQuery);
(function (d) {
    d(document).on("cycle-bootstrap", function (m, f, a) { "carousel" === f.fx && (a.getSlideIndex = function (e) { var k = this.opts()._carouselWrap.children(); return k.index(e) % k.length }, a.next = function () { var e = f.reverse ? -1 : 1; !1 === f.allowWrap && f.currSlide + e > f.slideCount - f.carouselVisible || (f.API.advanceSlide(e), f.API.trigger("cycle-next", [f]).log("cycle-next")) }) }); d.fn.cycle.transitions.carousel = {
        preInit: function (m) {
            m.hideNonActive = !1; m.container.on("cycle-destroyed", d.proxy(this.onDestroy, m.API)); m.API.stopTransition =
                this.stopTransition; for (var f = 0; f < m.startingSlide; f++)m.container.append(m.slides[0])
        }, postInit: function (m) {
            var f; var a = m.carouselVertical; m.carouselVisible && m.carouselVisible > m.slideCount && (m.carouselVisible = m.slideCount - 1); var e = m.carouselVisible || m.slides.length; var k = { display: a ? "block" : "inline-block", position: "static" }; m.container.css({ position: "relative", overflow: "hidden" }); m.slides.css(k); m._currSlide = m.currSlide; k = d('<div class="cycle-carousel-wrap"></div>').prependTo(m.container).css({
                margin: 0,
                padding: 0, top: 0, left: 0, position: "absolute"
            }).append(m.slides); m._carouselWrap = k; a || k.css("white-space", "nowrap"); if (!1 !== m.allowWrap) { for (f = 0; f < (void 0 === m.carouselVisible ? 2 : 1); f++) { for (a = 0; a < m.slideCount; a++)k.append(m.slides[a].cloneNode(!0)); for (a = m.slideCount; a--;)k.prepend(m.slides[a].cloneNode(!0)) } k.find(".cycle-slide-active").removeClass("cycle-slide-active"); m.slides.eq(m.startingSlide).addClass("cycle-slide-active") } m.pager && !1 === m.allowWrap && (e = m.slideCount - e, d(m.pager).children().filter(":gt(" +
                e + ")").hide()); m._nextBoundry = m.slideCount - m.carouselVisible; this.prepareDimensions(m)
        }, prepareDimensions: function (m) {
            var f = m.carouselVertical; var a = m.carouselVisible || m.slides.length; m.carouselFluid && m.carouselVisible ? m._carouselResizeThrottle || this.fluidSlides(m) : m.carouselVisible && m.carouselSlideDimension ? (a *= m.carouselSlideDimension, m.container[f ? "height" : "width"](a)) : m.carouselVisible && (a *= d(m.slides[0])[f ? "outerHeight" : "outerWidth"](!0), m.container[f ? "height" : "width"](a)); a = m.carouselOffset ||
                0; if (!1 !== m.allowWrap) if (m.carouselSlideDimension) a -= (m.slideCount + m.currSlide) * m.carouselSlideDimension; else { var e = m._carouselWrap.children(); for (var k = 0; k < m.slideCount + m.currSlide; k++)a -= d(e[k])[f ? "outerHeight" : "outerWidth"](!0) } m._carouselWrap.css(f ? "top" : "left", a)
        }, fluidSlides: function (m) {
            function f() { clearTimeout(e); e = setTimeout(a, 20) } function a() {
                m._carouselWrap.stop(!1, !0); var q = m.container.width() / m.carouselVisible; q = Math.ceil(q - n); m._carouselWrap.children().width(q); m._sentinel && m._sentinel.width(q);
                p(m)
            } var e, k = m.slides.eq(0), n = k.outerWidth() - k.width(), p = this.prepareDimensions; d(window).on("resize", f); m._carouselResizeThrottle = f; a()
        }, transition: function (m, f, a, e, k) {
            f = {}; var n = m.nextSlide - m.currSlide; a = m.carouselVertical; var p = m.speed; if (!1 === m.allowWrap) {
                e = 0 < n; var q = m._currSlide, u = m.slideCount - m.carouselVisible; 0 < n && m.nextSlide > u && q == u ? n = 0 : 0 < n && m.nextSlide > u ? n = m.nextSlide - q - (m.nextSlide - u) : 0 > n && m.currSlide > u && m.nextSlide > u ? n = 0 : 0 > n && m.currSlide > u ? n += m.currSlide - u : q = m.currSlide; n = this.getScroll(m,
                    a, q, n); m.API.opts()._currSlide = m.nextSlide > u ? u : m.nextSlide
            } else e && 0 === m.nextSlide ? (n = this.getDim(m, m.currSlide, a), k = this.genCallback(m, e, a, k)) : e || m.nextSlide != m.slideCount - 1 ? n = this.getScroll(m, a, m.currSlide, n) : (n = this.getDim(m, m.currSlide, a), k = this.genCallback(m, e, a, k)); f[a ? "top" : "left"] = e ? "-=" + n : "+=" + n; m.throttleSpeed && (p = n / d(m.slides[0])[a ? "height" : "width"]() * m.speed); m._carouselWrap.animate(f, p, m.easing, k)
        }, getDim: function (m, f, a) { return d(m.slides[f])[a ? "outerHeight" : "outerWidth"](!0) }, getScroll: function (m,
            f, a, e) { var k, n = 0; if (0 < e) for (k = a; k < a + e; k++)n += this.getDim(m, k, f); else for (k = a; k > a + e; k--)n += this.getDim(m, k, f); return n }, genCallback: function (m, f, a, e) { return function () { var k = 0 - d(m.slides[m.nextSlide]).position()[a ? "top" : "left"] + (m.carouselOffset || 0); m._carouselWrap.css(m.carouselVertical ? "top" : "left", k); e() } }, stopTransition: function () { var m = this.opts(); m.slides.stop(!1, !0); m._carouselWrap.stop(!1, !0) }, onDestroy: function (m) {
                m = this.opts(); m._carouselResizeThrottle && d(window).off("resize", m._carouselResizeThrottle);
                m.slides.prependTo(m.container); m._carouselWrap.remove()
            }
    }
})(jQuery);
var tns = function () {
    function d() { for (var G, U, ha, qa = arguments[0] || {}, Ca = 1, mb = arguments.length; Ca < mb; Ca++)if (null !== (G = arguments[Ca])) for (U in G) qa !== (ha = G[U]) && void 0 !== ha && (qa[U] = ha); return qa } function m(G) { return 0 <= ["true", "false"].indexOf(G) ? JSON.parse(G) : G } function f(G, U, ha, qa) { if (qa) try { G.setItem(U, ha) } catch (Ca) { } return ha } function a() { var G = document, U = G.body; return U || ((U = G.createElement("body")).fake = !0), U } function e(G) {
        var U = ""; return G.fake && (U = Na.style.overflow, G.style.background = "", G.style.overflow =
            Na.style.overflow = "hidden", Na.appendChild(G)), U
    } function k(G, U) { G.fake && (G.remove(), Na.style.overflow = U, Na.offsetHeight) } function n(G, U, ha, qa) { "insertRule" in G ? G.insertRule(U + "{" + ha + "}", qa) : G.addRule(U, ha, qa) } function p(G) { return ("insertRule" in G ? G.cssRules : G.rules).length } function q(G, U, ha) { for (var qa = 0, Ca = G.length; qa < Ca; qa++)U.call(ha, G[qa], qa) } function u(G, U) {
        if (G = void 0 !== G.item || G instanceof Array ? G : [G], "[object Object]" === Object.prototype.toString.call(U)) for (var ha = G.length; ha--;)for (var qa in U) G[ha].setAttribute(qa,
            U[qa])
    } function x(G, U) { G = void 0 !== G.item || G instanceof Array ? G : [G]; for (var ha = (U = U instanceof Array ? U : [U]).length, qa = G.length; qa--;)for (var Ca = ha; Ca--;)G[qa].removeAttribute(U[Ca]) } function E(G) { for (var U = [], ha = 0, qa = G.length; ha < qa; ha++)U.push(G[ha]); return U } function z(G, U) { "none" !== G.style.display && (G.style.display = "none") } function H(G, U) { "none" === G.style.display && (G.style.display = "") } function L(G) {
        if ("string" == typeof G) {
            var U = [G], ha = G.charAt(0).toUpperCase() + G.substr(1);["Webkit", "Moz", "ms", "O"].forEach(function (rb) {
                "ms" ===
                rb && "transform" !== G || U.push(rb + ha)
            }); G = U
        } for (var qa = document.createElement("fakeelement"), Ca = (G.length, 0); Ca < G.length; Ca++) { var mb = G[Ca]; if (void 0 !== qa.style[mb]) return mb } return !1
    } function D(G, U) { var ha = !1; return /^Webkit/.test(G) ? ha = "webkit" + U + "End" : /^O/.test(G) ? ha = "o" + U + "End" : G && (ha = U.toLowerCase() + "end"), ha } function M(G, U, ha) { for (var qa in U) { var Ca = 0 <= ["touchstart", "touchmove"].indexOf(qa) && !ha && Da; G.addEventListener(qa, U[qa], Ca) } } function N(G, U) {
        for (var ha in U) {
            var qa = 0 <= ["touchstart", "touchmove"].indexOf(ha) &&
                Da; G.removeEventListener(ha, U[ha], qa)
        }
    } function Y() { return { topics: {}, on: function (G, U) { this.topics[G] = this.topics[G] || []; this.topics[G].push(U) }, off: function (G, U) { if (this.topics[G]) for (var ha = 0; ha < this.topics[G].length; ha++)if (this.topics[G][ha] === U) { this.topics[G].splice(ha, 1); break } }, emit: function (G, U) { U.type = G; this.topics[G] && this.topics[G].forEach(function (ha) { ha(U, G) }) } } } Object.keys || (Object.keys = function (G) { var U = [], ha; for (ha in G) Object.prototype.hasOwnProperty.call(G, ha) && U.push(ha); return U });
    "remove" in Element.prototype || (Element.prototype.remove = function () { this.parentNode && this.parentNode.removeChild(this) }); var aa = window, fa = aa.requestAnimationFrame || aa.webkitRequestAnimationFrame || aa.mozRequestAnimationFrame || aa.msRequestAnimationFrame || function (G) { return setTimeout(G, 16) }; aa = window; var ka = aa.cancelAnimationFrame || aa.mozCancelAnimationFrame || function (G) { clearTimeout(G) }, Na = document.documentElement, Ka = (aa = "classList" in document.createElement("_")) ? function (G, U) { return G.classList.contains(U) } :
        function (G, U) { return 0 <= G.className.indexOf(U) }, ua = aa ? function (G, U) { Ka(G, U) || G.classList.add(U) } : function (G, U) { Ka(G, U) || (G.className += " " + U) }, V = aa ? function (G, U) { Ka(G, U) && G.classList.remove(U) } : function (G, U) { Ka(G, U) && (G.className = G.className.replace(U, "")) }, Fa = !1; try { var ea = Object.defineProperty({}, "passive", { get: function () { Fa = !0 } }); window.addEventListener("test", null, ea) } catch (G) { } var Da = !!Fa && { passive: !0 }, Wa = function (G) {
            function U(y) { y && (La = Qa = Xa = Fb = K = sa = ya = Ra = !1) } function ha() {
                for (var y = na ? ba - wa :
                    ba; 0 > y;)y += va; return y % va + 1
            } function qa(y) { return y = y ? Math.max(0, Math.min(X ? va - 1 : va - v, y)) : 0, na ? y + wa : y } function Ca(y) { null == y && (y = ba); for (na && (y -= wa); 0 > y;)y += va; return Math.floor(y % va) } function mb() { var y, B = Ca(); return y = Jb ? B : c || b ? Math.ceil((B + 1) * Aa / va - 1) : Math.floor(B / v), !X && na && ba === ob && (y = Aa - 1), y } function rb(y) { return "top" === y ? "afterbegin" : "beforeend" } function yb() {
                var y = g ? 2 * g - l : 0; return function S(J) {
                    var W, ja, ta = Za.createElement("div"); return J.appendChild(ta), ja = (W = ta.getBoundingClientRect()).right -
                        W.left, ta.remove(), ja || S(J.parentNode)
                }(Dd) - y
            } function gb(y) { if (G[y]) return !0; if (Ta) for (var B in Ta) if (Ta[B][y]) return !0; return !1 } function ra(y, B) { if (null == B && (B = nd), "items" === y && c) return Math.floor((r + l) / (c + l)) || 1; var J = G[y]; if (Ta) for (var S in Ta) B >= parseInt(S) && y in Ta[S] && (J = Ta[S][y]); return "slideBy" === y && "page" === J && (J = ra("items")), na || "slideBy" !== y && "items" !== y || (J = Math.floor(J)), J } function Ac(y, B, J, S, W) {
                var ja = ""; void 0 !== y ? (J = y, B && (J -= B), ja = Oa ? "margin: 0 " + J + "px 0 " + y + "px;" : "margin: " + y + "px 0 " +
                    J + "px 0;") : B && !J && (y = "-" + B + "px", ja = "margin: 0 " + (Oa ? y + " 0 0" : "0 " + y + " 0") + ";"); return !na && W && eb && S && (ja += kc(S)), ja
            } function Oc(y, B, J) { return y ? (y + B) * za + "px" : tc ? tc + "(" + 100 * za + "% / " + J + ")" : 100 * za / J + "%" } function Pc(y, B, J) { y ? y = y + B + "px" : (na || (J = Math.floor(J)), y = na ? za : J, y = tc ? tc + "(100% / " + y + ")" : 100 / y + "%"); return y = "width:" + y, "inner" !== lc ? y + ";" : y + " !important;" } function Mb(y) { var B = ""; !1 !== y && (B = (Oa ? "padding-" : "margin-") + (Oa ? "right" : "bottom") + ": " + y + "px;"); return B } function bc(y, B) {
                var J = y.substring(0, y.length -
                    B).toLowerCase(); return J && (J = "-" + J + "-"), J
            } function kc(y) { return bc(eb, 18) + "transition-duration:" + y / 1E3 + "s;" } function od(y) { return bc(Bc, 17) + "animation-duration:" + y / 1E3 + "s;" } function Ed() {
                if (gb("autoHeight") || b || !Oa) { var y = pa.querySelectorAll("img"); q(y, function (B) { var J = B.src; J && 0 > J.indexOf("data:image") ? (M(B, Ia), B.src = "", B.src = J, ua(B, "loading")) : hb || (ua(B, "loaded"), Cc(B)) }); fa(function () { Kb(E(y), function () { pd = !0 }) }); !b && Oa && (y = Fd(ba, Math.min(ba + v - 1, za - 1))); hb ? Qc() : fa(function () { Kb(E(y), Qc) }) } else na &&
                    Rc(), uc(), qd()
            } function Qc() { if (b) { var y = X ? ba : va - 1; !function J() { Pa[y - 1].getBoundingClientRect().right.toFixed(2) === Pa[y].getBoundingClientRect().left.toFixed(2) ? ce() : setTimeout(function () { J() }, 16) }() } else ce() } function ce() { Oa && !b || (de(), b ? (sb = Sc(), rd && (Nb = Gd()), ob = Ob(), U(vb || Nb)) : sd()); na && Rc(); uc(); qd() } function uc() {
                if (Dc(), ib.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + ee() + "</span>  of " +
                    va + "</div>"), Tc = ib.querySelector(".tns-liveregion .current"), Ub) { var y = sa ? "stop" : "start"; jb ? u(jb, { "data-action": y }) : G.autoplayButtonOutput && (ib.insertAdjacentHTML(rb(G.autoplayPosition), '<button data-action="' + y + '">' + Hd[0] + y + Hd[1] + $a[0] + "</button>"), jb = ib.querySelector("[data-action]")); jb && M(jb, { click: fe }); sa && (Uc(), ya && M(pa, mc), Ra && M(pa, Vc)) } if (Id) {
                        if (oa) u(oa, { "aria-label": "Carousel Pagination" }), q(ca = oa.children, function (S, W) { u(S, { "data-nav": W, tabindex: "-1", "aria-label": cb + (W + 1), "aria-controls": ab }) });
                        else { y = ""; for (var B = Jb ? "" : 'style="display:none"', J = 0; J < va; J++)y += '<button data-nav="' + J + '" tabindex="-1" aria-controls="' + ab + '" ' + B + ' aria-label="' + cb + (J + 1) + '"></button>'; y = '<div class="tns-nav" aria-label="Carousel Pagination">' + y + "</div>"; ib.insertAdjacentHTML(rb(G.navPosition), y); oa = ib.querySelector(".tns-nav"); ca = oa.children } if (Wc(), eb) y = eb.substring(0, eb.length - 18).toLowerCase(), B = "transition: all " + Q / 1E3 + "s", y && (B = "-" + y + "-" + B), n(ma, "[aria-controls^=" + ab + "-item]", B, p(ma)); u(ca[Ga], {
                            "aria-label": cb +
                                (Ga + 1) + Ec
                        }); x(ca[Ga], "tabindex"); ua(ca[Ga], kb); M(oa, Jd)
                    } Fc && (A || P && R || (ib.insertAdjacentHTML(rb(G.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + ab + '">' + nb[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + ab + '">' + nb[1] + "</button></div>"), A = ib.querySelector(".tns-controls")), P && R || (P = A.children[0], R = A.children[1]), G.controlsContainer && u(A, {
                        "aria-label": "Carousel Navigation",
                        tabindex: "0"
                    }), (G.controlsContainer || G.prevButton && G.nextButton) && u([P, R], { "aria-controls": ab, tabindex: "-1" }), (G.controlsContainer || G.prevButton && G.nextButton) && (u(P, { "data-controls": "prev" }), u(R, { "data-controls": "next" })), w = "button" === P.nodeName.toLowerCase(), F = "button" === R.nodeName.toLowerCase(), Gc(), A ? M(A, Xc) : (M(P, Xc), M(R, Xc))); Kd()
            } function qd() {
                if (na && Vb) { var y = {}; y[Vb] = Pb; M(pa, y) } Xa && M(pa, cc, G.preventScrollOnTouch); Fb && M(pa, Yc); K && M(Za, Zc); "inner" === lc ? Ya.on("outerResized", function () {
                    h(); Ya.emit("innerLoaded",
                        wb())
                }) : (Ta || c || b || xa || !Oa) && M(zb, { resize: da }); xa && ("outer" === lc ? Ya.on("innerLoaded", td) : vb || td()); Ld(); vb ? Md() : Nb && vc(); Ya.on("indexChanged", Nd); "inner" === lc && Ya.emit("innerLoaded", wb()); "function" == typeof ud && ud(wb()); nc = !0
            } function da(y) { fa(function () { h(dc(y)) }) } function h(y) {
                if (nc) {
                    "outer" === lc && Ya.emit("outerResized", wb(y)); nd = zb.innerWidth || Za.documentElement.clientWidth || Za.body.clientWidth; var B, J = wc, S = !1; Ta && (ge(), (B = J !== wc) && Ya.emit("newBreakpointStart", wb(y))); var W, ja, ta = v, pb = vb, Wb = Nb,
                        oc = K, Xb = La, vd = Qa, ve = Xa, Hc = Fb, we = sa, he = ya, Ce = Ra; J = ba; if (B) { var Od = c, Pd = xa, ie = nb, De = t, Qd = $a; if (!Ic) var Ee = l, Fe = g } if (K = ra("arrowKeys"), La = ra("controls"), Qa = ra("nav"), Xa = ra("touch"), t = ra("center"), Fb = ra("mouseDrag"), sa = ra("autoplay"), ya = ra("autoplayHoverPause"), Ra = ra("autoplayResetOnVisibility"), B && (vb = ra("disable"), c = ra("fixedWidth"), Q = ra("speed"), xa = ra("autoHeight"), nb = ra("controlsText"), $a = ra("autoplayText"), Db = ra("autoplayTimeout"), Ic || (g = ra("edgePadding"), l = ra("gutter"))), U(vb), r = yb(), Oa && !b || vb ||
                            (de(), Oa || (sd(), S = !0)), (c || b) && (sb = Sc(), ob = Ob()), (B || c) && (v = ra("items"), C = ra("slideBy"), (ja = v !== ta) && (c || b || (ob = Ob()), xe())), B && vb !== pb && (vb ? Md() : function () { if (pc) { if (ma.disabled = !1, pa.className += ec, Rc(), X) for (var Gb = wa; Gb--;)na && H(Pa[Gb]), H(Pa[za - Gb - 1]); if (!na) { Gb = ba; for (var $c = ba + va; Gb < $c; Gb++) { var Yb = Pa[Gb], ye = Gb < ba + v ? qc : Qb; Yb.style.left = 100 * (Gb - ba) / v + "%"; ua(Yb, ye) } } je(); pc = !1 } }()), rd && (B || c || b) && (Nb = Gd()) !== Wb && (Nb ? (Rd(Jc(qa(0))), vc()) : (!function () {
                                if (ad) {
                                    g && Ic && (lb.style.margin = ""); if (wa) for (var Gb =
                                        wa; Gb--;)na && V(Pa[Gb], "tns-transparent"), V(Pa[za - Gb - 1], "tns-transparent"); je(); ad = !1
                                }
                            }(), S = !0)), U(vb || Nb), sa || (ya = Ra = !1), K !== oc && (K ? M(Za, Zc) : N(Za, Zc)), La !== Xb && (La ? A ? H(A) : (P && H(P), R && H(R)) : A ? z(A) : (P && z(P), R && z(R))), Qa !== vd && (Qa ? H(oa) : z(oa)), Xa !== ve && (Xa ? M(pa, cc, G.preventScrollOnTouch) : N(pa, cc)), Fb !== Hc && (Fb ? M(pa, Yc) : N(pa, Yc)), sa !== we && (sa ? (jb && H(jb), Eb || wd || Uc()) : (jb && z(jb), Eb && bd())), ya !== he && (ya ? M(pa, mc) : N(pa, mc)), Ra !== Ce && (Ra ? M(Za, Vc) : N(Za, Vc)), B) {
                                if (c === Od && t === De || (S = !0), xa !== Pd && (xa || (lb.style.height =
                                    "")), La && nb !== ie && (P.innerHTML = nb[0], R.innerHTML = nb[1]), jb && $a !== Qd) Od = sa ? 1 : 0, Pd = jb.innerHTML, ie = Pd.length - Qd[Od].length, Pd.substring(ie) === Qd[Od] && (jb.innerHTML = Pd.substring(0, ie) + $a[Od])
                    } else t && (c || b) && (S = !0); ((ja || c && !b) && (Aa = Sd(), Wc()), (W = ba !== J) ? (Ya.emit("indexChanged", wb()), S = !0) : ja ? W || Nd() : (c || b) && (Ld(), Dc(), Td()), ja && !na && function () {
                        for (var Gb = ba + Math.min(va, v), $c = za; $c--;) {
                            var Yb = Pa[$c]; ba <= $c && $c < Gb ? (ua(Yb, "tns-moving"), Yb.style.left = 100 * ($c - ba) / v + "%", ua(Yb, qc), V(Yb, Qb)) : Yb.style.left &&
                                (Yb.style.left = "", ua(Yb, Qb), V(Yb, qc)); V(Yb, xd)
                        } setTimeout(function () { q(Pa, function (ye) { V(ye, "tns-moving") }) }, 300)
                    }(), vb || Nb) || (B && !Ic && (xa === autoheightTem && Q === speedTem || cd(), g === Fe && l === Ee || (lb.style.cssText = Ac(g, l, c, Q, xa)), Oa) && (na && (pa.style.width = Oc(c, l, v)), Qd = Pc(c, l, v) + Mb(l), ja = p(W = ma) - 1, "deleteRule" in W ? W.deleteRule(ja) : W.removeRule(ja), n(ma, "#" + ab + " > .tns-item", Qd, p(ma))), xa && td(), S && (Rc(), fb = ba)); B && Ya.emit("newBreakpointEnd", wb(y))
                }
            } function Gd() {
                if (!c && !b) return va <= (t ? v - (v - 1) / 2 : v); var y =
                    c ? (c + l) * va : db[va], B = g ? r + 2 * g : r + l; return t && (B -= c ? (r - c) / 2 : (r - (db[ba + 1] - db[ba] - l)) / 2), y <= B
            } function ge() { for (var y in wc = 0, Ta) (y = parseInt(y)) <= nd && (wc = y) } function Kd() { !sa && jb && z(jb); !Qa && oa && z(oa); La || (A ? z(A) : (P && z(P), R && z(R))) } function je() { sa && jb && H(jb); Qa && oa && H(oa); La && (A ? H(A) : (P && H(P), R && H(R))) } function vc() { if (!ad) { if (g && (lb.style.margin = "0px"), wa) for (var y = wa; y--;)na && ua(Pa[y], "tns-transparent"), ua(Pa[za - y - 1], "tns-transparent"); Kd(); ad = !0 } } function Md() {
                if (!pc) {
                    if (ma.disabled = !0, pa.className =
                        pa.className.replace(ec.substring(1), ""), x(pa, ["style"]), X) for (var y = wa; y--;)na && z(Pa[y]), z(Pa[za - y - 1]); if (Oa && na || x(lb, ["style"]), !na) { y = ba; for (var B = ba + va; y < B; y++) { var J = Pa[y]; x(J, ["style"]); V(J, qc); V(J, Qb) } } Kd(); pc = !0
                }
            } function Td() { var y = ee(); Tc.innerHTML !== y && (Tc.innerHTML = y) } function ee() { var y = ia(), B = y[0] + 1; y = y[1] + 1; return B === y ? B + "" : B + " to " + y } function ia(y) {
                null == y && (y = Jc()); var B, J, S, W = ba; if (t || g ? (b || c) && (J = -(parseFloat(y) + g), S = J + r + 2 * g) : b && (J = db[ba], S = J + r), b) db.forEach(function (ja, ta) {
                    ta <
                    za && ((t || g) && ja <= J + .5 && (W = ta), .5 <= S - ja && (B = ta))
                }); else { if (c) y = c + l, t || g ? (W = Math.floor(J / y), B = Math.ceil(S / y - 1)) : B = W + Math.ceil(r / y) - 1; else if (t || g) { y = v - 1; if (t ? (W -= y / 2, B = ba + y / 2) : B = ba + y, g) y = g * v / r, W -= y, B += y; W = Math.floor(W); B = Math.ceil(B) } else B = W + v - 1; W = Math.max(W, 0); B = Math.min(B, za - 1) } return [W, B]
            } function Ld() {
                hb && !vb && Fd.apply(null, ia()).forEach(function (y) {
                    if (!Ka(y, dd)) {
                        var B = {}; B[Vb] = function (J) { J.stopPropagation() }; M(y, B); M(y, Ia); y.src = y.getAttribute("data-src"); (B = y.getAttribute("data-srcset")) && (y.srcset =
                            B); ua(y, "loading")
                    }
                })
            } function Cc(y) { ua(y, "tns-complete"); V(y, "loading"); N(y, Ia) } function Fd(y, B) { for (var J = []; y <= B;)q(Pa[y].querySelectorAll("img"), function (S) { J.push(S) }), y++; return J } function td() { var y = Fd.apply(null, ia()); fa(function () { Kb(y, ke) }) } function Kb(y, B) { return pd ? B() : (y.forEach(function (J, S) { Ka(J, dd) && y.splice(S, 1) }), y.length ? void fa(function () { Kb(y, B) }) : B()) } function Nd() {
                Ld(); Dc(); Td(); Gc(); if (Qa && (Ga = 0 <= tb ? tb : mb(), tb = -1, Ga !== Ja)) {
                    var y = ca[Ja], B = ca[Ga]; u(y, {
                        tabindex: "-1", "aria-label": cb +
                            (Ja + 1)
                    }); V(y, kb); u(B, { "aria-label": cb + (Ga + 1) + Ec }); x(B, "tabindex"); ua(B, kb); Ja = Ga
                }
            } function cd() { na && xa && (Lb.style[eb] = Q / 1E3 + "s") } function le(y, B) { for (var J = [], S = y, W = Math.min(y + B, za); S < W; S++)J.push(Pa[S].offsetHeight); return Math.max.apply(null, J) } function ke() { var y = xa ? le(ba, v) : le(wa, va), B = Lb || lb; B.style.height !== y && (B.style.height = y + "px") } function de() {
                db = [0]; var y = Oa ? "left" : "top", B = Oa ? "right" : "bottom", J = Pa[0].getBoundingClientRect()[y]; q(Pa, function (S, W) {
                    W && db.push(S.getBoundingClientRect()[y] -
                        J); W === za - 1 && db.push(S.getBoundingClientRect()[B] - J)
                })
            } function Dc() { var y = ia(), B = y[0], J = y[1]; q(Pa, function (S, W) { B <= W && W <= J ? S.hasAttribute("aria-hidden") && (x(S, ["aria-hidden", "tabindex"]), ua(S, fc)) : S.hasAttribute("aria-hidden") || (u(S, { "aria-hidden": "true", tabindex: "-1" }), V(S, fc)) }) } function Zb(y, B, J) { y ? B.disabled = J : B.setAttribute("aria-disabled", J.toString()) } function Gc() {
                if (La && !T && !X) {
                    var y = w ? P.disabled : "true" === P.getAttribute("aria-disabled"), B = F ? R.disabled : "true" === R.getAttribute("aria-disabled"),
                    J = ba <= Ab, S = !T && ob <= ba; J && !y && Zb(w, P, !0); !J && y && Zb(w, P, !1); S && !B && Zb(F, R, !0); !S && B && Zb(F, R, !1)
                }
            } function Rb(y) { return null == y && (y = ba), b ? (r - (g ? l : 0) - (db[y + 1] - db[y] - l)) / 2 : c ? (r - c) / 2 : (v - 1) / 2 } function Sc() { var y = r + (g ? l : 0) - (c ? (c + l) * za : db[za]); return t && !X && (y = c ? -(c + l) * (za - 1) - Rb() : Rb(za - 1) - db[za - 1]), 0 < y && (y = 0), y } function Jc(y) { if (null == y && (y = ba), Oa && !b) if (c) y *= -(c + l), t && (y += Rb()); else { var B = rc ? za : v; t && (y -= Rb()); y = 100 * -y / B } else y = -db[y], t && b && (y += Rb()); return qb && (y = Math.max(y, sb)), y + (!Oa || b || c ? "px" : "%") } function Rc(y) {
                eb &&
                (pa.style[eb] = "0s"); Rd(y)
            } function Rd(y) { null == y && (y = Jc()); pa.style[Ea] = Ua + y + xb } function Ud(y, B, J, S) { var W = y + v; X || (W = Math.min(W, za)); for (var ja = y; ja < W; ja++) { var ta = Pa[ja]; S || (ta.style.left = 100 * (ja - ba) / v + "%"); Vd && Sb && (ta.style[Sb] = ta.style[gc] = Vd * (ja - y) / 1E3 + "s"); V(ta, B); ua(ta, J); S && Sa.push(ta) } } function yd(y, B) { Ma && xe(); (ba !== fb || B) && (Ya.emit("indexChanged", wb()), Ya.emit("transitionStart", wb()), xa && td(), Eb && y && 0 <= ["click", "keydown"].indexOf(y.type) && bd(), Bb = !0, Ge()) } function Pb(y) {
                if (na || Bb) {
                    if (Ya.emit("transitionEnd",
                        wb(y)), !na && 0 < Sa.length) for (var B = 0; B < Sa.length; B++) { var J = Sa[B]; J.style.left = ""; gc && Sb && (J.style[gc] = "", J.style[Sb] = ""); V(J, xd); ua(J, Qb) } if (!y || !na && y.target.parentNode === pa || y.target === pa && y.propertyName.toLowerCase().replace(/-/g, "") === Ea.toLowerCase().replace(/-/g, "")) Ma || (y = ba, xe(), ba !== y && (Ya.emit("indexChanged", wb()), Rc())), "inner" === lc && Ya.emit("innerLoaded", wb()), Bb = !1, fb = ba
                }
            } function ed(y, B) {
                if (!Nb) if ("prev" === y) hc(B, -1); else if ("next" === y) hc(B, 1); else {
                    if (Bb) { if (Hb) return; Pb() } var J = Ca(),
                        S = 0; if ("first" === y ? S = -J : "last" === y ? S = na ? va - v - J : va - 1 - J : ("number" != typeof y && (y = parseInt(y)), isNaN(y) || (B || (y = Math.max(0, Math.min(va - 1, y))), S = y - J)), !na && S && Math.abs(S) < v) J = 0 < S ? 1 : -1, S += Ab <= ba + S - va ? va * J : 2 * va * J * -1; ba += S; na && X && (ba < Ab && (ba += va), ob < ba && (ba -= va)); Ca(ba) !== Ca(fb) && yd(B)
                }
            } function hc(y, B) {
                if (Bb) { if (Hb) return; Pb() } var J; if (!B) { for (var S = xc(y = dc(y)); S !== A && 0 > [P, R].indexOf(S);)S = S.parentNode; S = [P, R].indexOf(S); 0 <= S && (J = !0, B = 0 === S ? -1 : 1) } if (T) {
                    if (ba === Ab && -1 === B) return void ed("last", y); if (ba ===
                        ob && 1 === B) return void ed("first", y)
                } B && (ba += C * B, b && (ba = Math.floor(ba)), yd(J || y && "keydown" === y.type ? y : null))
            } function Kc() { Cb = setInterval(function () { hc(null, Ae) }, Db); Eb = !0 } function fd() { clearInterval(Cb); Eb = !1 } function Wd(y, B) { u(jb, { "data-action": y }); jb.innerHTML = Hd[0] + y + Hd[1] + B } function Uc() { Kc(); jb && Wd("stop", $a[1]) } function bd() { fd(); jb && Wd("start", $a[0]) } function fe() { Eb ? (bd(), wd = !0) : (Uc(), wd = !1) } function dc(y) { return yc(y = y || zb.event) ? y.changedTouches[0] : y } function xc(y) { return y.target || zb.event.srcElement }
            function yc(y) { return 0 <= y.type.indexOf("touch") } function me() { return W = ic.y - gd.y, ja = ic.x - gd.x, y = 180 / Math.PI * Math.atan2(W, ja), B = zd, J = !1, S = Math.abs(90 - Math.abs(y)), 90 - B <= S ? J = "horizontal" : S <= B && (J = "vertical"), J === G.axis; var y, B, J, S, W, ja } function Ib(y) {
                if (Bb) { if (Hb) return; Pb() } sa && Eb && fd(); hd = !0; $b && (ka($b), $b = null); var B = dc(y); Ya.emit(yc(y) ? "touchStart" : "dragStart", wb(y)); !yc(y) && 0 <= ["img", "a"].indexOf(xc(y).nodeName.toLowerCase()) && (y.preventDefault ? y.preventDefault() : y.returnValue = !1); ic.x = gd.x = B.clientX;
                ic.y = gd.y = B.clientY; na && (ne = parseFloat(pa.style[Ea].replace(Ua, "")), eb && (pa.style[eb] = "0s"))
            } function Ad(y) {
                if (hd) {
                    var B = dc(y); ic.x = B.clientX; ic.y = B.clientY; na ? $b || ($b = fa(function () { !function W(S) { if (!ac) return void (hd = !1); ka($b); hd && ($b = fa(function () { W(S) })); "?" === ac && (ac = me()); if (ac) { !Lc && yc(S) && (Lc = !0); try { S.type && Ya.emit(yc(S) ? "touchMove" : "dragMove", wb(S)) } catch (pb) { } var ja = ne, ta = ze(ic, gd); !Oa || c || b ? ja = ja + ta + "px" : (ja += rc ? ta * v * 100 / ((r + l) * za) : 100 * ta / (r + l), ja += "%"); pa.style[Ea] = Ua + ja + xb } }(y) })) :
                        ("?" === ac && (ac = me()), ac && (Lc = !0)); Lc && y.preventDefault()
                }
            } function sc(y) {
                if (hd) {
                    $b && (ka($b), $b = null); na && eb && (pa.style[eb] = ""); hd = !1; var B = dc(y); ic.x = B.clientX; ic.y = B.clientY; var J = ze(ic, gd); if (Math.abs(J)) {
                        if (!yc(y)) { var S = xc(y); M(S, { click: function ta(ja) { ja.preventDefault ? ja.preventDefault() : ja.returnValue = !1; N(S, { click: ta }) } }) } na ? $b = fa(function () {
                            if (Oa && !b) { var W = -J * v / (r + l); W = 0 < J ? Math.floor(W) : Math.ceil(W); ba += W } else if (W = -(ne + J), 0 >= W) ba = Ab; else if (W >= db[za - 1]) ba = ob; else for (var ja = 0; ja < za && W >=
                                db[ja];)W > db[ba = ja] && 0 > J && (ba += 1), ja++; yd(y, J); Ya.emit(yc(y) ? "touchEnd" : "dragEnd", wb(y))
                        }) : ac && hc(y, 0 < J ? -1 : 1)
                    }
                } "auto" === G.preventScrollOnTouch && (Lc = !1); zd && (ac = "?"); sa && !Eb && Kc()
            } function sd() { (Lb || lb).style.height = db[ba + v] - db[ba] + "px" } function Sd() { return Math.min(Math.ceil(c ? (c + l) * va / r : va / v), va) } function Wc() { if (Qa && !Jb && Aa !== Va) { var y = Va, B = Aa, J = H; for (Aa < Va && (y = Aa, B = Va, J = z); y < B;)J(ca[y]), y++; Va = Aa } } function wb(y) {
                return {
                    container: pa, slideItems: Pa, navContainer: oa, navItems: ca, controlsContainer: A,
                    hasControls: Fc, prevButton: P, nextButton: R, items: v, slideBy: C, cloneCount: wa, slideCount: va, slideCountNew: za, index: ba, indexCached: fb, displayIndex: ha(), navCurrentIndex: Ga, navCurrentIndexCached: Ja, pages: Aa, pagesCached: Va, sheet: ma, isOn: nc, event: y || {}
                }
            } G = d({
                container: ".slider", mode: "carousel", axis: "horizontal", items: 1, gutter: 0, edgePadding: 0, fixedWidth: !1, autoWidth: !1, viewportMax: !1, slideBy: 1, center: !1, controls: !0, controlsPosition: "top", controlsText: ["prev", "next"], controlsContainer: !1, prevButton: !1, nextButton: !1,
                nav: !0, navPosition: "top", navContainer: !1, navAsThumbnails: !1, arrowKeys: !1, speed: 300, autoplay: !1, autoplayPosition: "top", autoplayTimeout: 5E3, autoplayDirection: "forward", autoplayText: ["start", "stop"], autoplayHoverPause: !1, autoplayButton: !1, autoplayButtonOutput: !0, autoplayResetOnVisibility: !0, animateIn: "tns-fadeIn", animateOut: "tns-fadeOut", animateNormal: "tns-normal", animateDelay: !1, loop: !0, rewind: !1, autoHeight: !1, responsive: !1, lazyload: !1, lazyloadSelector: ".tns-lazy-img", touch: !0, mouseDrag: !1, swipeAngle: 15,
                nested: !1, preventActionWhenRunning: !1, preventScrollOnTouch: !1, freezable: !0, onInit: !1, useLocalStorage: !0
            }, G || {}); var Za = document, zb = window, Ba = {}, ub = G.useLocalStorage; if (ub) { var oe = navigator.userAgent, id = new Date; try { (Ba = zb.localStorage) ? (Ba.setItem(id, id), ub = Ba.getItem(id) == id, Ba.removeItem(id)) : ub = !1, ub || (Ba = {}) } catch (y) { ub = !1 } ub && (Ba.tnsApp && Ba.tnsApp !== oe && "tC tPL tMQ tTf t3D tTDu tTDe tADu tADe tTE tAE".split(" ").forEach(function (y) { Ba.removeItem(y) }), localStorage.tnsApp = oe) } var pe, Bd, zc, Xd, Tb,
                jc, tc = Ba.tC ? m(Ba.tC) : f(Ba, "tC", function () { var y = document, B = a(), J = e(B); y = y.createElement("div"); var S = !1; B.appendChild(y); try { for (var W, ja = ["calc(10px * 10)", "-moz-calc(10px * 10)", "-webkit-calc(10px * 10)"], ta = 0; 3 > ta; ta++)if (W = ja[ta], y.style.width = W, 100 === y.offsetWidth) { S = W.replace("(10px * 10)", ""); break } } catch (pb) { } return B.fake ? k(B, J) : y.remove(), S }(), ub), Yd = Ba.tPL ? m(Ba.tPL) : f(Ba, "tPL", function () {
                    var y, B = document, J = a(), S = e(J), W = B.createElement("div"); B = B.createElement("div"); var ja = ""; W.className =
                        "tns-t-subp2"; B.className = "tns-t-ct"; for (var ta = 0; 70 > ta; ta++)ja += "<div></div>"; return B.innerHTML = ja, W.appendChild(B), J.appendChild(W), y = 2 > Math.abs(W.getBoundingClientRect().left - B.children[67].getBoundingClientRect().left), J.fake ? k(J, S) : W.remove(), y
                }(), ub), Ic = Ba.tMQ ? m(Ba.tMQ) : f(Ba, "tMQ", (Bd = document, zc = a(), Xd = e(zc), Tb = Bd.createElement("div"), jc = Bd.createElement("style"), jc.type = "text/css", Tb.className = "tns-mq-test", zc.appendChild(jc), zc.appendChild(Tb), jc.styleSheet ? jc.styleSheet.cssText = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}" :
                    jc.appendChild(Bd.createTextNode("@media all and (min-width:1px){.tns-mq-test{position:absolute}}")), pe = window.getComputedStyle ? window.getComputedStyle(Tb).position : Tb.currentStyle.position, zc.fake ? k(zc, Xd) : Tb.remove(), "absolute" === pe), ub), rc = Ba.tTf ? m(Ba.tTf) : f(Ba, "tTf", L("transform"), ub), jd = Ba.t3D ? m(Ba.t3D) : f(Ba, "t3D", function (y) {
                        if (!y || !window.getComputedStyle) return !1; var B, J = document, S = a(), W = e(S); J = J.createElement("p"); var ja = 9 < y.length ? "-" + y.slice(0, -9).toLowerCase() + "-" : ""; return ja += "transform",
                            S.insertBefore(J, null), J.style[y] = "translate3d(1px,1px,1px)", B = window.getComputedStyle(J).getPropertyValue(ja), S.fake ? k(S, W) : J.remove(), void 0 !== B && 0 < B.length && "none" !== B
                    }(rc), ub), eb = Ba.tTDu ? m(Ba.tTDu) : f(Ba, "tTDu", L("transitionDuration"), ub), Sb = Ba.tTDe ? m(Ba.tTDe) : f(Ba, "tTDe", L("transitionDelay"), ub), Bc = Ba.tADu ? m(Ba.tADu) : f(Ba, "tADu", L("animationDuration"), ub), gc = Ba.tADe ? m(Ba.tADe) : f(Ba, "tADe", L("animationDelay"), ub), Vb = Ba.tTE ? m(Ba.tTE) : f(Ba, "tTE", D(eb, "Transition"), ub), qe = Ba.tAE ? m(Ba.tAE) : f(Ba, "tAE",
                        D(Bc, "Animation"), ub), Mc = zb.console && "function" == typeof zb.console.warn, Zd = "container controlsContainer prevButton nextButton navContainer autoplayButton".split(" "), re = {}; if (Zd.forEach(function (y) { if ("string" == typeof G[y]) { var B = G[y], J = Za.querySelector(B); if (re[y] = B, !J || !J.nodeName) return void (Mc && console.warn("Can't find", G[y])); G[y] = J } }), !(1 > G.container.children.length)) {
                            var Ta = G.responsive, lc = G.nested, na = "carousel" === G.mode; if (Ta) {
                                0 in Ta && (G = d(G, Ta[0]), delete Ta[0]); var $d = {}, ae; for (ae in Ta) {
                                    var Nc =
                                        Ta[ae]; Nc = "number" == typeof Nc ? { items: Nc } : Nc; $d[ae] = Nc
                                } Ta = $d; $d = null
                            } if (na || function J(B) { for (var S in B) na || ("slideBy" === S && (B[S] = "page"), "edgePadding" === S && (B[S] = !1), "autoHeight" === S && (B[S] = !1)), "responsive" === S && J(B[S]) }(G), !na) { G.axis = "horizontal"; G.slideBy = "page"; G.edgePadding = !1; var qc = G.animateIn, xd = G.animateOut, Vd = G.animateDelay, Qb = G.animateNormal } var Lb, wc, Oa = "horizontal" === G.axis, ib = Za.createElement("div"), lb = Za.createElement("div"), pa = G.container, Dd = pa.parentNode, be = pa.outerHTML, Pa = pa.children,
                                va = Pa.length, nd = zb.innerWidth || Za.documentElement.clientWidth || Za.body.clientWidth, nc = !1; Ta && ge(); na && (pa.className += " tns-vpfix"); var db, pd, Tc, Cd, kd, ld, md, b = G.autoWidth, c = ra("fixedWidth"), g = ra("edgePadding"), l = ra("gutter"), r = yb(), t = ra("center"), v = b ? 1 : Math.floor(ra("items")), C = ra("slideBy"), I = G.viewportMax || G.fixedWidthViewportWidth, K = ra("arrowKeys"), Q = ra("speed"), T = G.rewind, X = !T && G.loop, xa = ra("autoHeight"), La = ra("controls"), nb = ra("controlsText"), Qa = ra("nav"), Xa = ra("touch"), Fb = ra("mouseDrag"), sa =
                                    ra("autoplay"), Db = ra("autoplayTimeout"), $a = ra("autoplayText"), ya = ra("autoplayHoverPause"), Ra = ra("autoplayResetOnVisibility"), ma = (md = document.createElement("style"), document.querySelector("head").appendChild(md), md.sheet ? md.sheet : md.styleSheet), hb = G.lazyload, Sa = (G.lazyloadSelector, []), wa = X ? (kd = function () {
                                        if (b || c && !I) return va - 1; var B = c ? "fixedWidth" : "items", J = []; if ((c || G[B] < va) && J.push(G[B]), Ta) for (var S in Ta) { var W = Ta[S][B]; W && (c || W < va) && J.push(W) } return J.length || J.push(0), Math.ceil(c ? I / Math.min.apply(null,
                                            J) : Math.max.apply(null, J))
                                    }(), ld = na ? Math.ceil((5 * kd - va) / 2) : 4 * kd - va, ld = Math.max(kd, ld), gb("edgePadding") ? ld + 1 : ld) : 0, za = na ? va + 2 * wa : va + wa, qb = !(!c && !b || X), sb = c ? Sc() : null, Ma = !na || !X, Ea = Oa ? "left" : "top", Ua = "", xb = "", Ob = c ? function () { return t && !X ? va - 1 : Math.ceil(-sb / (c + l)) } : b ? function () { for (var B = za; B--;)if (db[B] >= -sb) return B } : function () { return t && na && !X ? va - 1 : X || na ? Math.max(0, za - Math.ceil(v)) : za - 1 }, ba = qa(ra("startIndex")), fb = ba, Ab = (ha(), 0), ob = b ? null : Ob(), Hb = G.preventActionWhenRunning, zd = G.swipeAngle, ac = !zd ||
                                        "?", Bb = !1, ud = G.onInit, Ya = new Y, ec = " tns-slider tns-" + G.mode, ab = pa.id || (Cd = window.tnsId, window.tnsId = Cd ? Cd + 1 : 1, "tns" + window.tnsId), vb = ra("disable"), pc = !1, rd = G.freezable, Nb = !(!rd || b) && Gd(), ad = !1, Xc = { click: hc, keydown: function (B) { B = dc(B); var J = [37, 39].indexOf(B.keyCode); 0 <= J && (0 === J ? P.disabled || hc(B, -1) : R.disabled || hc(B, 1)) } }, Jd = {
                                            click: function (B) {
                                                if (Bb) { if (Hb) return; Pb() } for (var J = xc(B = dc(B)); J !== oa && !J.hasAttribute("data-nav");)J = J.parentNode; if (J.hasAttribute("data-nav")) {
                                                    J = tb = Number(J.getAttribute("data-nav"));
                                                    var S = c || b ? J * va / Aa : J * v; ed(Jb ? J : Math.min(Math.ceil(S), va - 1), B); Ga === J && (Eb && bd(), tb = -1)
                                                }
                                            }, keydown: function (B) { B = dc(B); var J = Za.activeElement; if (J.hasAttribute("data-nav")) { var S = [37, 39, 13, 32].indexOf(B.keyCode); J = Number(J.getAttribute("data-nav")); 0 <= S && (0 === S ? 0 < J && ca[J - 1].focus() : 1 === S ? J < Aa - 1 && ca[J + 1].focus() : ed(tb = J, B)) } }
                                        }, mc = { mouseover: function () { Eb && (fd(), se = !0) }, mouseout: function () { se && (Kc(), se = !1) } }, Vc = { visibilitychange: function () { Za.hidden ? Eb && (fd(), te = !0) : te && (Kc(), te = !1) } }, Zc = {
                                            keydown: function (B) {
                                                B =
                                                dc(B); var J = [37, 39].indexOf(B.keyCode); 0 <= J && hc(B, 0 === J ? -1 : 1)
                                            }
                                        }, cc = { touchstart: Ib, touchmove: Ad, touchend: sc, touchcancel: sc }, Yc = { mousedown: Ib, mousemove: Ad, mouseup: sc, mouseleave: sc }, Fc = gb("controls"), Id = gb("nav"), Jb = !!b || G.navAsThumbnails, Ub = gb("autoplay"), bb = gb("touch"), ue = gb("mouseDrag"), fc = "tns-slide-active", dd = "tns-complete", Ia = { load: function (B) { B = xc(B); ua(B, "loaded"); Cc(B) }, error: function (B) { B = xc(B); ua(B, "failed"); Cc(B) } }, Lc = "force" === G.preventScrollOnTouch; if (Fc) var w, F, A = G.controlsContainer, O =
                                            G.controlsContainer ? G.controlsContainer.outerHTML : "", P = G.prevButton, R = G.nextButton, Z = G.prevButton ? G.prevButton.outerHTML : "", la = G.nextButton ? G.nextButton.outerHTML : ""; if (Id) var ca, oa = G.navContainer, Ha = G.navContainer ? G.navContainer.outerHTML : "", Aa = b ? va : Sd(), Va = 0, tb = -1, Ga = mb(), Ja = Ga, kb = "tns-nav-active", cb = "Carousel Page ", Ec = " (Current Slide)"; if (Ub) var Cb, Eb, se, wd, te, Ae = "forward" === G.autoplayDirection ? 1 : -1, jb = G.autoplayButton, Be = G.autoplayButton ? G.autoplayButton.outerHTML : "", Hd = ["<span class='tns-visually-hidden'>",
                                                " animation</span>"]; if (bb || ue) var ne, $b, gd = {}, ic = {}, hd = !1, ze = Oa ? function (B, J) { return B.x - J.x } : function (B, J) { return B.y - J.y }; b || U(vb || Nb); rc && (Ea = rc, Ua = "translate", jd ? (Ua += Oa ? "3d(" : "3d(0px, ", xb = Oa ? ", 0px, 0px)" : ", 0px)") : (Ua += Oa ? "X(" : "Y(", xb = ")")); na && (pa.className = pa.className.replace("tns-vpfix", "")); (function () {
                                                    gb("gutter"); ib.className = "tns-outer"; lb.className = "tns-inner"; ib.id = ab + "-ow"; lb.id = ab + "-iw"; "" === pa.id && (pa.id = ab); ec += Yd || b ? " tns-subpixel" : " tns-no-subpixel"; ec += tc ? " tns-calc" : " tns-no-calc";
                                                    b && (ec += " tns-autowidth"); ec += " tns-" + G.axis; pa.className += ec; na ? ((Lb = Za.createElement("div")).id = ab + "-mw", Lb.className = "tns-ovh", ib.appendChild(Lb), Lb.appendChild(lb)) : ib.appendChild(lb); xa && ((Lb || lb).className += " tns-ah"); if (Dd.insertBefore(ib, pa), lb.appendChild(pa), q(Pa, function (ta, pb) { ua(ta, "tns-item"); ta.id || (ta.id = ab + "-item" + pb); !na && Qb && ua(ta, Qb); u(ta, { "aria-hidden": "true", tabindex: "-1" }) }), wa) {
                                                        for (var B = Za.createDocumentFragment(), J = Za.createDocumentFragment(), S = wa; S--;) {
                                                            var W = S % va, ja = Pa[W].cloneNode(!0);
                                                            if (x(ja, "id"), J.insertBefore(ja, J.firstChild), na) W = Pa[va - 1 - W].cloneNode(!0), x(W, "id"), B.appendChild(W)
                                                        } pa.insertBefore(B, pa.firstChild); pa.appendChild(J); Pa = pa.children
                                                    }
                                                })(); (function () {
                                                    if (!na) for (var B = ba, J = ba + Math.min(va, v); B < J; B++) { var S = Pa[B]; S.style.left = 100 * (B - ba) / v + "%"; ua(S, qc); V(S, Qb) } Oa && (Yd || b ? (n(ma, "#" + ab + " > .tns-item", "font-size:" + zb.getComputedStyle(Pa[0]).fontSize + ";", p(ma)), n(ma, "#" + ab, "font-size:0;", p(ma))) : na && q(Pa, function (we, he) {
                                                        we.style.marginLeft = tc ? tc + "(" + 100 * he + "% / " + za + ")" :
                                                            100 * he / za + "%"
                                                    })); Ic ? (eb && (B = Lb && G.autoHeight ? kc(G.speed) : "", n(ma, "#" + ab + "-mw", B, p(ma))), B = Ac(G.edgePadding, G.gutter, G.fixedWidth, G.speed, G.autoHeight), n(ma, "#" + ab + "-iw", B, p(ma)), na && (B = Oa && !b ? "width:" + Oc(G.fixedWidth, G.gutter, G.items) + ";" : "", eb && (B += kc(Q)), n(ma, "#" + ab, B, p(ma))), B = Oa && !b ? Pc(G.fixedWidth, G.gutter, G.items) : "", G.gutter && (B += Mb(G.gutter)), na || (eb && (B += kc(Q)), Bc && (B += od(Q)))) : (cd(), lb.style.cssText = Ac(g, l, c, xa), na && Oa && !b && (pa.style.width = Oc(c, l, v)), B = Oa && !b ? Pc(c, l, v) : "", l && (B += Mb(l)));
                                                    B && n(ma, "#" + ab + " > .tns-item", B, p(ma)); if (Ta && Ic) for (var W in Ta) {
                                                        W = parseInt(W); J = Ta[W]; var ja = S = B = "", ta = "", pb = "", Wb = b ? null : ra("items", W), oc = ra("fixedWidth", W), Xb = ra("speed", W), vd = ra("edgePadding", W), ve = ra("autoHeight", W), Hc = ra("gutter", W); eb && Lb && ra("autoHeight", W) && "speed" in J && (S = "#" + ab + "-mw{" + kc(Xb) + "}"); ("edgePadding" in J || "gutter" in J) && (ja = "#" + ab + "-iw{" + Ac(vd, Hc, oc, Xb, ve) + "}"); na && Oa && !b && ("fixedWidth" in J || "items" in J || c && "gutter" in J) && (ta = "width:" + Oc(oc, Hc, Wb) + ";"); eb && "speed" in J && (ta +=
                                                            kc(Xb)); ta && (ta = "#" + ab + "{" + ta + "}"); ("fixedWidth" in J || c && "gutter" in J || !na && "items" in J) && (pb += Pc(oc, Hc, Wb)); "gutter" in J && (pb += Mb(Hc)); !na && "speed" in J && (eb && (pb += kc(Xb)), Bc && (pb += od(Xb))); pb && (pb = "#" + ab + " > .tns-item{" + pb + "}"); (B = S + ja + ta + pb) && ma.insertRule("@media (min-width: " + W / 16 + "em) {" + B + "}", ma.cssRules.length)
                                                    }
                                                })(); Ed(); var xe = X ? na ? function () { var B = Ab, J = ob; B += C; J -= C; g ? (B += 1, --J) : c && (r + l) % (c + l) && --J; wa && (J < ba ? ba -= va : ba < B && (ba += va)) } : function () {
                                                    if (ob < ba) for (; Ab + va <= ba;)ba -= va; else if (ba < Ab) for (; ba <=
                                                        ob - va;)ba += va
                                                } : function () { ba = Math.max(Ab, Math.min(ob, ba)) }, Ge = na ? function () { var B, J, S, W, ja, ta, pb, Wb, oc, Xb, vd; eb && (pa.style[eb] = ""); eb || !Q ? (Rd(), Q && "none" !== window.getComputedStyle(pa).display || Pb()) : (B = pa, J = Ea, S = Ua, W = xb, ja = Jc(), ta = Q, pb = Pb, Wb = Math.min(ta, 10), oc = 0 <= ja.indexOf("%") ? "%" : "px", ja = ja.replace(oc, ""), Xb = Number(B.style[J].replace(S, "").replace(W, "").replace(oc, "")), vd = (ja - Xb) / ta * Wb, setTimeout(function Hc() { ta -= Wb; Xb += vd; B.style[J] = S + Xb + oc + W; 0 < ta ? setTimeout(Hc, Wb) : pb() }, Wb)); Oa || sd() } : function () {
                                                    Sa =
                                                    []; var B = {}; B[Vb] = B[qe] = Pb; N(Pa[fb], B); M(Pa[ba], B); Ud(fb, qc, xd, !0); Ud(ba, Qb, qc); Vb && qe && Q && "none" !== window.getComputedStyle(pa).display || Pb()
                                                }; return {
                                                    version: "2.9.2", getInfo: wb, events: Ya, goTo: ed, play: function () { sa && !Eb && (Uc(), wd = !1) }, pause: function () { Eb && (bd(), wd = !0) }, isOn: nc, updateSliderHeight: ke, refresh: Ed, destroy: function () {
                                                        if (ma.disabled = !0, ma.ownerNode && ma.ownerNode.remove(), N(zb, { resize: da }), K && N(Za, Zc), A && N(A, Xc), oa && N(oa, Jd), N(pa, mc), N(pa, Vc), jb && N(jb, { click: fe }), sa && clearInterval(Cb), na &&
                                                            Vb) { var B = {}; B[Vb] = Pb; N(pa, B) } Xa && N(pa, cc); Fb && N(pa, Yc); var J = [be, O, Z, la, Ha, Be], S; for (S in Zd.forEach(function (W, ja) { var ta = "container" === W ? ib : G[W]; if ("object" == typeof ta) { var pb = !!ta.previousElementSibling && ta.previousElementSibling, Wb = ta.parentNode; ta.outerHTML = J[ja]; G[W] = pb ? pb.nextElementSibling : Wb.firstElementChild } }), Zd = qc = xd = Vd = Qb = Oa = ib = lb = pa = Dd = be = Pa = va = wc = nd = b = c = g = l = r = v = C = I = K = Q = T = X = xa = ma = hb = db = Sa = wa = za = qb = sb = Ma = Ea = Ua = xb = Ob = ba = fb = Ab = ob = zd = ac = Bb = ud = Ya = ec = ab = vb = pc = rd = Nb = ad = Xc = Jd = mc = Vc = Zc = cc =
                                                                Yc = Fc = Id = Jb = Ub = bb = ue = fc = dd = Ia = pd = La = nb = A = O = P = R = w = F = Qa = oa = Ha = ca = Aa = Va = tb = Ga = Ja = kb = cb = Ec = sa = Db = Ae = $a = ya = jb = Be = Ra = Hd = Cb = Eb = se = wd = te = gd = ic = ne = hd = $b = ze = Xa = Fb = null, this) "rebuild" !== S && (this[S] = null); nc = !1
                                                    }, rebuild: function () { return Wa(d(G, re)) }
                                                }
                        } Mc && console.warn("No slides found in", G.container)
        }; return Wa
}();
(function (d) {
    function m(n, p) { for (var q = Array.prototype.slice.call(arguments).splice(2), u = n.split("."), x = u.pop(), E = 0; E < u.length; E++)p = p[u[E]]; return p[x].apply(this, q) } var f = [], a = {
        options: { prependExistingHelpBlock: !1, sniffHtml: !0, preventSubmit: !0, submitError: !1, submitSuccess: !1, semanticallyStrict: !1, autoAdd: { helpBlocks: !0 }, filter: function () { return !0 } }, methods: {
            init: function (n) {
                var p = d.extend(!0, {}, a); p.options = d.extend(!0, p.options, n); n = d.unique(this.map(function () { return d(this).parents("form")[0] }).toArray());
                d(n).bind("submit", function (q) {
                    var u = d(this), x = 0, E = u.find("input,textarea,select").not("[type=submit],[type=image]").filter(p.options.filter); E.trigger("submit.validation").trigger("validationLostFocus.validation"); E.each(function (z, H) { var L = d(H).parents(".control-group").first(); L.hasClass("has-warning") && (L.removeClass("has-warning").addClass("has-error"), x++) }); E.trigger("validationLostFocus.validation"); x ? (p.options.preventSubmit && q.preventDefault(), u.addClass("has-error"), d.isFunction(p.options.submitError) &&
                        p.options.submitError(u, q, E.jqBootstrapValidation("collectErrors", !0))) : (u.removeClass("has-error"), d.isFunction(p.options.submitSuccess) && p.options.submitSuccess(u, q))
                }); return this.each(function () {
                    var q = d(this), u = q.parents(".control-group").first(), x = u.find(".help-block").first(), E = q.parents("form").first(), z = []; !x.length && p.options.autoAdd && p.options.autoAdd.helpBlocks && (x = d('<div class="help-block" />'), u.find(".controls").append(x), f.push(x[0])); if (p.options.sniffHtml) {
                        var H = ""; void 0 !== q.attr("pattern") &&
                            (H = "Not in the expected format\x3c!-- data-validation-pattern-message to override --\x3e", q.data("validationPatternMessage") && (H = q.data("validationPatternMessage")), q.data("validationPatternMessage", H), q.data("validationPatternRegex", q.attr("pattern"))); if (void 0 !== q.attr("max") || void 0 !== q.attr("aria-valuemax")) {
                                var L = void 0 !== q.attr("max") ? q.attr("max") : q.attr("aria-valuemax"); H = "Too high: Maximum of '" + L + "'\x3c!-- data-validation-max-message to override --\x3e"; q.data("validationMaxMessage") &&
                                    (H = q.data("validationMaxMessage")); q.data("validationMaxMessage", H); q.data("validationMaxMax", L)
                            } if (void 0 !== q.attr("min") || void 0 !== q.attr("aria-valuemin")) L = void 0 !== q.attr("min") ? q.attr("min") : q.attr("aria-valuemin"), H = "Too low: Minimum of '" + L + "'\x3c!-- data-validation-min-message to override --\x3e", q.data("validationMinMessage") && (H = q.data("validationMinMessage")), q.data("validationMinMessage", H), q.data("validationMinMin", L); void 0 !== q.attr("maxlength") && (H = "Too long: Maximum of '" + q.attr("maxlength") +
                                "' characters\x3c!-- data-validation-maxlength-message to override --\x3e", q.data("validationMaxlengthMessage") && (H = q.data("validationMaxlengthMessage")), q.data("validationMaxlengthMessage", H), q.data("validationMaxlengthMaxlength", q.attr("maxlength"))); void 0 !== q.attr("minlength") && (H = "Too short: Minimum of '" + q.attr("minlength") + "' characters\x3c!-- data-validation-minlength-message to override --\x3e", q.data("validationMinlengthMessage") && (H = q.data("validationMinlengthMessage")), q.data("validationMinlengthMessage",
                                    H), q.data("validationMinlengthMinlength", q.attr("minlength"))); if (void 0 !== q.attr("required") || void 0 !== q.attr("aria-required")) H = p.builtInValidators.required.message, q.data("validationRequiredMessage") && (H = q.data("validationRequiredMessage")), q.data("validationRequiredMessage", H); void 0 !== q.attr("type") && "number" === q.attr("type").toLowerCase() && (H = p.builtInValidators.number.message, q.data("validationNumberMessage") && (H = q.data("validationNumberMessage")), q.data("validationNumberMessage", H)); void 0 !==
                                        q.attr("type") && "email" === q.attr("type").toLowerCase() && (H = "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e", q.data("validationValidemailMessage") ? H = q.data("validationValidemailMessage") : q.data("validationEmailMessage") && (H = q.data("validationEmailMessage")), q.data("validationValidemailMessage", H)); void 0 !== q.attr("minchecked") && (H = "Not enough options checked; Minimum of '" + q.attr("minchecked") + "' required\x3c!-- data-validation-minchecked-message to override --\x3e",
                                            q.data("validationMincheckedMessage") && (H = q.data("validationMincheckedMessage")), q.data("validationMincheckedMessage", H), q.data("validationMincheckedMinchecked", q.attr("minchecked"))); void 0 !== q.attr("maxchecked") && (H = "Too many options checked; Maximum of '" + q.attr("maxchecked") + "' required\x3c!-- data-validation-maxchecked-message to override --\x3e", q.data("validationMaxcheckedMessage") && (H = q.data("validationMaxcheckedMessage")), q.data("validationMaxcheckedMessage", H), q.data("validationMaxcheckedMaxchecked",
                                                q.attr("maxchecked")))
                    } void 0 !== q.data("validation") && (z = q.data("validation").split(",")); d.each(q.data(), function (N, Y) { var aa = N.replace(/([A-Z])/g, ",$1").split(","); "validation" === aa[0] && aa[1] && z.push(aa[1]) }); H = z; var D = []; do d.each(z, function (N, Y) { z[N] = e(Y) }), z = d.unique(z), D = [], d.each(H, function (N, Y) {
                        if (void 0 !== q.data("validation" + Y + "Shortcut")) d.each(q.data("validation" + Y + "Shortcut").split(","), function (fa, ka) { D.push(ka) }); else if (p.builtInValidators[Y.toLowerCase()]) {
                            var aa = p.builtInValidators[Y.toLowerCase()];
                            "shortcut" === aa.type.toLowerCase() && d.each(aa.shortcut.split(","), function (fa, ka) { ka = e(ka); D.push(ka); z.push(ka) })
                        }
                    }), H = D; while (0 < H.length); var M = {}; d.each(z, function (N, Y) {
                        var aa = q.data("validation" + Y + "Message"), fa = void 0 !== aa, ka = !1; aa = aa ? aa : "'" + Y + "' validation failed \x3c!-- Add attribute 'data-validation-" + Y.toLowerCase() + "-message' to input to change this message --\x3e"; d.each(p.validatorTypes, function (ua, V) {
                            void 0 === M[ua] && (M[ua] = []); ka || void 0 === q.data("validation" + Y + e(V.name)) || (M[ua].push(d.extend(!0,
                                { name: e(V.name), message: aa }, V.init(q, Y))), ka = !0)
                        }); if (!ka && p.builtInValidators[Y.toLowerCase()]) { var Na = d.extend(!0, {}, p.builtInValidators[Y.toLowerCase()]); fa && (Na.message = aa); var Ka = Na.type.toLowerCase(); "shortcut" === Ka ? ka = !0 : d.each(p.validatorTypes, function (ua, V) { void 0 === M[ua] && (M[ua] = []); ka || Ka !== ua.toLowerCase() || (q.data("validation" + Y + e(V.name), Na[V.name.toLowerCase()]), M[Ka].push(d.extend(Na, V.init(q, Y))), ka = !0) }) } ka || d.error("Cannot find validation info for '" + Y + "'")
                    }); x.data("original-contents",
                        x.data("original-contents") ? x.data("original-contents") : x.html()); x.data("original-role", x.data("original-role") ? x.data("original-role") : x.attr("role")); u.data("original-classes", u.data("original-clases") ? u.data("original-classes") : u.attr("class")); q.data("original-aria-invalid", q.data("original-aria-invalid") ? q.data("original-aria-invalid") : q.attr("aria-invalid")); q.bind("validation.validation", function (N, Y) {
                            var aa = k(q), fa = []; d.each(M, function (ka, Na) {
                                (aa || aa.length || Y && Y.includeEmpty || p.validatorTypes[ka].blockSubmit &&
                                    Y && Y.submitting) && d.each(Na, function (Ka, ua) { p.validatorTypes[ka].validate(q, aa, ua) && fa.push(ua.message) })
                            }); return fa
                        }); q.bind("getValidators.validation", function () { return M }); q.bind("submit.validation", function () { return q.triggerHandler("change.validation", { submitting: !0 }) }); q.bind("keyup focus blur click keydown keypress change".split(" ").join(".validation ") + ".validation", function (N, Y) {
                            var aa = k(q), fa = []; u.find("input,textarea,select").each(function (ka, Na) {
                                var Ka = fa.length; d.each(d(Na).triggerHandler("validation.validation",
                                    Y), function (ua, V) { fa.push(V) }); fa.length > Ka ? d(Na).attr("aria-invalid", "true") : (Ka = q.data("original-aria-invalid"), d(Na).attr("aria-invalid", void 0 !== Ka ? Ka : !1))
                            }); E.find("input,select,textarea").not(q).not('[name="' + q.attr("name") + '"]').trigger("validationLostFocus.validation"); fa = d.unique(fa.sort()); fa.length ? (u.removeClass("has-success has-error").addClass("has-warning"), p.options.semanticallyStrict && 1 === fa.length ? x.html(fa[0] + (p.options.prependExistingHelpBlock ? x.data("original-contents") : "")) :
                                x.html('<ul role="alert"><li>' + fa.join("</li><li>") + "</li></ul>" + (p.options.prependExistingHelpBlock ? x.data("original-contents") : ""))) : (u.removeClass("has-warning has-error has-success"), 0 < aa.length && u.addClass("has-success"), x.html(x.data("original-contents"))); "blur" === N.type && u.removeClass("has-success")
                        }); q.bind("validationLostFocus.validation", function () { u.removeClass("has-success") })
                })
            }, destroy: function () {
                return this.each(function () {
                    var n = d(this), p = n.parents(".control-group").first(), q = p.find(".help-block").first();
                    n.unbind(".validation"); q.html(q.data("original-contents")); p.attr("class", p.data("original-classes")); n.attr("aria-invalid", n.data("original-aria-invalid")); q.attr("role", n.data("original-role")); -1 < f.indexOf(q[0]) && q.remove()
                })
            }, collectErrors: function (n) { var p = {}; this.each(function (q, u) { var x = d(u), E = x.attr("name"); x = x.triggerHandler("validation.validation", { includeEmpty: !0 }); p[E] = d.extend(!0, x, p[E]) }); d.each(p, function (q, u) { 0 === u.length && delete p[q] }); return p }, hasErrors: function () {
                var n = []; this.each(function (p,
                    q) { n = n.concat(d(q).triggerHandler("getValidators.validation") ? d(q).triggerHandler("validation.validation", { submitting: !0 }) : []) }); return 0 < n.length
            }, override: function (n) { a = d.extend(!0, a, n) }
        }, validatorTypes: {
            callback: {
                name: "callback", init: function (n, p) { return { validatorName: p, callback: n.data("validation" + p + "Callback"), lastValue: n.val(), lastValid: !0, lastFinished: !0 } }, validate: function (n, p, q) {
                    if (q.lastValue === p && q.lastFinished) return !q.lastValid; !0 === q.lastFinished && (q.lastValue = p, q.lastValid = !0, q.lastFinished =
                        !1, m(q.callback, window, n, p, function (u) { q.lastValue === u.value && (q.lastValid = u.valid, u.message && (q.message = u.message), q.lastFinished = !0, n.data("validation" + q.validatorName + "Message", q.message), setTimeout(function () { n.trigger("change.validation") }, 1)) })); return !1
                }
            }, ajax: {
                name: "ajax", init: function (n, p) { return { validatorName: p, url: n.data("validation" + p + "Ajax"), lastValue: n.val(), lastValid: !0, lastFinished: !0 } }, validate: function (n, p, q) {
                    if ("" + q.lastValue === "" + p && !0 === q.lastFinished) return !1 === q.lastValid; !0 ===
                        q.lastFinished && (q.lastValue = p, q.lastValid = !0, q.lastFinished = !1, d.ajax({
                            url: q.url, data: "value=" + p + "&field=" + n.attr("name"), dataType: "json", success: function (u) { "" + q.lastValue === "" + u.value && (q.lastValid = !!u.valid, u.message && (q.message = u.message), q.lastFinished = !0, n.data("validation" + q.validatorName + "Message", q.message), setTimeout(function () { n.trigger("change.validation") }, 1)) }, failure: function () {
                                q.lastValid = !0; q.message = "ajax call failed"; q.lastFinished = !0; n.data("validation" + q.validatorName + "Message",
                                    q.message); setTimeout(function () { n.trigger("change.validation") }, 1)
                            }
                        })); return !1
                }
            }, regex: { name: "regex", init: function (n, p) { return { regex: new RegExp("^" + n.data("validation" + p + "Regex") + "$") } }, validate: function (n, p, q) { return !q.regex.test(p) && !q.negative || q.regex.test(p) && q.negative } }, required: { name: "required", init: function (n, p) { return {} }, validate: function (n, p, q) { return !(0 !== p.length || q.negative) || !!(0 < p.length && q.negative) }, blockSubmit: !0 }, match: {
                name: "match", init: function (n, p) {
                    var q = n.parents("form").first().find('[name="' +
                        n.data("validation" + p + "Match") + '"]').first(); q.bind("validation.validation", function () { n.trigger("change.validation", { submitting: !0 }) }); return { element: q }
                }, validate: function (n, p, q) { return p !== q.element.val() && !q.negative || p === q.element.val() && q.negative }, blockSubmit: !0
            }, max: { name: "max", init: function (n, p) { return { max: n.data("validation" + p + "Max") } }, validate: function (n, p, q) { return parseFloat(p, 10) > parseFloat(q.max, 10) && !q.negative || parseFloat(p, 10) <= parseFloat(q.max, 10) && q.negative } }, min: {
                name: "min", init: function (n,
                    p) { return { min: n.data("validation" + p + "Min") } }, validate: function (n, p, q) { return parseFloat(p) < parseFloat(q.min) && !q.negative || parseFloat(p) >= parseFloat(q.min) && q.negative }
            }, maxlength: { name: "maxlength", init: function (n, p) { return { maxlength: n.data("validation" + p + "Maxlength") } }, validate: function (n, p, q) { return p.length > q.maxlength && !q.negative || p.length <= q.maxlength && q.negative } }, minlength: {
                name: "minlength", init: function (n, p) { return { minlength: n.data("validation" + p + "Minlength") } }, validate: function (n, p, q) {
                    return p.length <
                        q.minlength && !q.negative || p.length >= q.minlength && q.negative
                }
            }, maxchecked: { name: "maxchecked", init: function (n, p) { var q = n.parents("form").first().find('[name="' + n.attr("name") + '"]'); q.bind("click.validation", function () { n.trigger("change.validation", { includeEmpty: !0 }) }); return { maxchecked: n.data("validation" + p + "Maxchecked"), elements: q } }, validate: function (n, p, q) { return q.elements.filter(":checked").length > q.maxchecked && !q.negative || q.elements.filter(":checked").length <= q.maxchecked && q.negative }, blockSubmit: !0 },
            minchecked: { name: "minchecked", init: function (n, p) { var q = n.parents("form").first().find('[name="' + n.attr("name") + '"]'); q.bind("click.validation", function () { n.trigger("change.validation", { includeEmpty: !0 }) }); return { minchecked: n.data("validation" + p + "Minchecked"), elements: q } }, validate: function (n, p, q) { return q.elements.filter(":checked").length < q.minchecked && !q.negative || q.elements.filter(":checked").length >= q.minchecked && q.negative }, blockSubmit: !0 }
        }, builtInValidators: {
            email: {
                name: "Email", type: "shortcut",
                shortcut: "validemail"
            }, validemail: { name: "Validemail", type: "regex", regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}", message: "Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e" }, passwordagain: { name: "Passwordagain", type: "match", match: "password", message: "Does not match the given password\x3c!-- data-validator-paswordagain-message to override --\x3e" }, positive: { name: "Positive", type: "shortcut", shortcut: "number,positivenumber" }, negative: {
                name: "Negative", type: "shortcut",
                shortcut: "number,negativenumber"
            }, number: { name: "Number", type: "regex", regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?", message: "Must be a number\x3c!-- data-validator-number-message to override --\x3e" }, integer: { name: "Integer", type: "regex", regex: "[+-]?\\d+", message: "No decimal places allowed\x3c!-- data-validator-integer-message to override --\x3e" }, positivenumber: { name: "Positivenumber", type: "min", min: 0, message: "Must be a positive number\x3c!-- data-validator-positivenumber-message to override --\x3e" },
            negativenumber: { name: "Negativenumber", type: "max", max: 0, message: "Must be a negative number\x3c!-- data-validator-negativenumber-message to override --\x3e" }, required: { name: "Required", type: "required", message: "This is required\x3c!-- data-validator-required-message to override --\x3e" }, checkone: { name: "Checkone", type: "minchecked", minchecked: 1, message: "Check at least one option\x3c!-- data-validation-checkone-message to override --\x3e" }
        }
    }, e = function (n) {
        return n.toLowerCase().replace(/(^|\s)([a-z])/g,
            function (p, q, u) { return q + u.toUpperCase() })
    }, k = function (n) { var p = n.val(), q = n.attr("type"); "checkbox" === q && (p = n.is(":checked") ? p : ""); "radio" === q && (p = 0 < d('input[name="' + n.attr("name") + '"]:checked').length ? p : ""); return p }; d.fn.jqBootstrapValidation = function (n) { return a.methods[n] ? a.methods[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== typeof n && n ? (d.error("Method " + n + " does not exist on jQuery.jqBootstrapValidation"), null) : a.methods.init.apply(this, arguments) }; d.jqBootstrapValidation =
        function (n) { d(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments) }
})(jQuery);
(function (d, m) { "object" === typeof module && "object" === typeof module.exports ? module.exports = d.document ? m(d, !0) : function (f) { if (!f.document) throw Error("jQuery requires a window with a document"); return m(f) } : m(d) })("undefined" !== typeof window ? window : this, function (d, m) {
    function f(b) { var c = b.length, g = h.type(b); return "function" === g || h.isWindow(b) ? !1 : 1 === b.nodeType && c ? !0 : "array" === g || 0 === c || "number" === typeof c && 0 < c && c - 1 in b } function a(b, c, g) {
        if (h.isFunction(c)) return h.grep(b, function (l, r) {
            return !!c.call(l,
                r, l) !== g
        }); if (c.nodeType) return h.grep(b, function (l) { return l === c !== g }); if ("string" === typeof c) { if (ee.test(c)) return h.filter(c, b, g); c = h.filter(c, b) } return h.grep(b, function (l) { return 0 <= h.inArray(l, c) !== g })
    } function e(b, c) { do b = b[c]; while (b && 1 !== b.nodeType); return b } function k(b) { var c = Nd[b] = {}; h.each(b.match(Kb) || [], function (g, l) { c[l] = !0 }); return c } function n() {
        ia.addEventListener ? (ia.removeEventListener("DOMContentLoaded", p, !1), d.removeEventListener("load", p, !1)) : (ia.detachEvent("onreadystatechange",
            p), d.detachEvent("onload", p))
    } function p() { if (ia.addEventListener || "load" === event.type || "complete" === ia.readyState) n(), h.ready() } function q(b, c, g) { if (void 0 === g && 1 === b.nodeType) if (g = "data-" + c.replace(de, "-$1").toLowerCase(), g = b.getAttribute(g), "string" === typeof g) { try { g = "true" === g ? !0 : "false" === g ? !1 : "null" === g ? null : +g + "" === g ? +g : ke.test(g) ? h.parseJSON(g) : g } catch (l) { } h.data(b, c, g) } else g = void 0; return g } function u(b) { for (var c in b) if (("data" !== c || !h.isEmptyObject(b[c])) && "toJSON" !== c) return !1; return !0 }
    function x(b, c, g, l) { if (h.acceptData(b)) { var r = h.expando, t = b.nodeType, v = t ? h.cache : b, C = t ? b[r] : b[r] && r; if (C && v[C] && (l || v[C].data) || void 0 !== g || "string" !== typeof c) { C || (C = t ? b[r] = Mb.pop() || h.guid++ : r); v[C] || (v[C] = t ? {} : { toJSON: h.noop }); if ("object" === typeof c || "function" === typeof c) l ? v[C] = h.extend(v[C], c) : v[C].data = h.extend(v[C].data, c); b = v[C]; l || (b.data || (b.data = {}), b = b.data); void 0 !== g && (b[h.camelCase(c)] = g); "string" === typeof c ? (g = b[c], null == g && (g = b[h.camelCase(c)])) : g = b; return g } } } function E(b, c, g) {
        if (h.acceptData(b)) {
            var l,
            r, t = b.nodeType, v = t ? h.cache : b, C = t ? b[h.expando] : h.expando; if (v[C]) { if (c && (l = g ? v[C] : v[C].data)) { h.isArray(c) ? c = c.concat(h.map(c, h.camelCase)) : c in l ? c = [c] : (c = h.camelCase(c), c = c in l ? [c] : c.split(" ")); for (r = c.length; r--;)delete l[c[r]]; if (g ? !u(l) : !h.isEmptyObject(l)) return } if (!g && (delete v[C].data, !u(v[C]))) return; t ? h.cleanData([b], !0) : da.deleteExpando || v != v.window ? delete v[C] : v[C] = null }
        }
    } function z() { return !0 } function H() { return !1 } function L() { try { return ia.activeElement } catch (b) { } } function D(b) {
        var c =
            Pb.split("|"); b = b.createDocumentFragment(); if (b.createElement) for (; c.length;)b.createElement(c.pop()); return b
    } function M(b, c) { var g, l, r = 0, t = "undefined" !== typeof b.getElementsByTagName ? b.getElementsByTagName(c || "*") : "undefined" !== typeof b.querySelectorAll ? b.querySelectorAll(c || "*") : void 0; if (!t) for (t = [], g = b.childNodes || b; null != (l = g[r]); r++)!c || h.nodeName(l, c) ? t.push(l) : h.merge(t, M(l, c)); return void 0 === c || c && h.nodeName(b, c) ? h.merge([b], t) : t } function N(b) { Sc.test(b.type) && (b.defaultChecked = b.checked) }
    function Y(b, c) { return h.nodeName(b, "table") && h.nodeName(11 !== c.nodeType ? c : c.firstChild, "tr") ? b.getElementsByTagName("tbody")[0] || b.appendChild(b.ownerDocument.createElement("tbody")) : b } function aa(b) { b.type = (null !== h.find.attr(b, "type")) + "/" + b.type; return b } function fa(b) { var c = yc.exec(b.type); c ? b.type = c[1] : b.removeAttribute("type"); return b } function ka(b, c) { for (var g, l = 0; null != (g = b[l]); l++)h._data(g, "globalEval", !c || h._data(c[l], "globalEval")) } function Na(b, c) {
        if (1 === c.nodeType && h.hasData(b)) {
            var g,
            l; var r = h._data(b); var t = h._data(c, r), v = r.events; if (v) for (g in delete t.handle, t.events = {}, v) for (r = 0, l = v[g].length; r < l; r++)h.event.add(c, g, v[g][r]); t.data && (t.data = h.extend({}, t.data))
        }
    } function Ka(b, c) { var g = h(c.createElement(b)).appendTo(c.body), l = d.getDefaultComputedStyle ? d.getDefaultComputedStyle(g[0]).display : h.css(g[0], "display"); g.detach(); return l } function ua(b) {
        var c = ia, g = sd[b]; g || (g = Ka(b, c), "none" !== g && g || (sc = (sc || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(c.documentElement),
            c = (sc[0].contentWindow || sc[0].contentDocument).document, c.write(), c.close(), g = Ka(b, c), sc.detach()), sd[b] = g); return g
    } function V(b, c) { return { get: function () { var g = b(); if (null != g) if (g) delete this.get; else return (this.get = c).apply(this, arguments) } } } function Fa(b, c) { if (c in b) return c; for (var g = c.charAt(0).toUpperCase() + c.slice(1), l = c, r = Xd.length; r--;)if (c = Xd[r] + g, c in b) return c; return l } function ea(b, c) {
        for (var g, l, r, t = [], v = 0, C = b.length; v < C; v++)l = b[v], l.style && (t[v] = h._data(l, "olddisplay"), g = l.style.display,
            c ? (t[v] || "none" !== g || (l.style.display = ""), "" === l.style.display && Gc(l) && (t[v] = h._data(l, "olddisplay", ua(l.nodeName)))) : t[v] || (r = Gc(l), (g && "none" !== g || !r) && h._data(l, "olddisplay", r ? g : h.css(l, "display")))); for (v = 0; v < C; v++)l = b[v], !l.style || c && "none" !== l.style.display && "" !== l.style.display || (l.style.display = c ? t[v] || "" : "none"); return b
    } function Da(b, c, g) { return (b = id.exec(c)) ? Math.max(0, b[1] - (g || 0)) + (b[2] || "px") : c } function Wa(b, c, g, l, r) {
        c = g === (l ? "border" : "content") ? 4 : "width" === c ? 1 : 0; for (var t = 0; 4 > c; c += 2)"margin" ===
            g && (t += h.css(b, g + Zb[c], !0, r)), l ? ("content" === g && (t -= h.css(b, "padding" + Zb[c], !0, r)), "margin" !== g && (t -= h.css(b, "border" + Zb[c] + "Width", !0, r))) : (t += h.css(b, "padding" + Zb[c], !0, r), "padding" !== g && (t += h.css(b, "border" + Zb[c] + "Width", !0, r))); return t
    } function G(b, c, g) {
        var l = !0, r = "width" === c ? b.offsetWidth : b.offsetHeight, t = Za(b), v = da.boxSizing() && "border-box" === h.css(b, "boxSizing", !1, t); if (0 >= r || null == r) {
            r = zb(b, c, t); if (0 > r || null == r) r = b.style[c]; if (Wc.test(r)) return r; l = v && (da.boxSizingReliable() || r === b.style[c]);
            r = parseFloat(r) || 0
        } return r + Wa(b, c, g || (v ? "border" : "content"), l, t) + "px"
    } function U(b, c, g, l, r) { return new U.prototype.init(b, c, g, l, r) } function ha() { setTimeout(function () { Tb = void 0 }); return Tb = h.now() } function qa(b, c) { var g = { height: b }, l = 0; for (c = c ? 1 : 0; 4 > l; l += 2 - c) { var r = Zb[l]; g["margin" + r] = g["padding" + r] = b } c && (g.opacity = g.width = b); return g } function Ca(b, c, g) { for (var l, r = (jd[c] || []).concat(jd["*"]), t = 0, v = r.length; t < v; t++)if (l = r[t].call(g, c, b)) return l } function mb(b, c) {
        var g, l; for (g in b) {
            var r = h.camelCase(g);
            var t = c[r]; var v = b[g]; h.isArray(v) && (t = v[1], v = b[g] = v[0]); g !== r && (b[r] = v, delete b[g]); if ((l = h.cssHooks[r]) && "expand" in l) for (g in v = l.expand(v), delete b[r], v) g in b || (b[g] = v[g], c[g] = t); else c[r] = t
        }
    } function rb(b, c, g) {
        var l, r = 0, t = rc.length, v = h.Deferred().always(function () { delete C.elem }), C = function () {
            if (l) return !1; var K = Tb || ha(); K = Math.max(0, I.startTime + I.duration - K); for (var Q = 1 - (K / I.duration || 0), T = 0, X = I.tweens.length; T < X; T++)I.tweens[T].run(Q); v.notifyWith(b, [I, Q, K]); if (1 > Q && X) return K; v.resolveWith(b,
                [I]); return !1
        }, I = v.promise({ elem: b, props: h.extend({}, c), opts: h.extend(!0, { specialEasing: {} }, g), originalProperties: c, originalOptions: g, startTime: Tb || ha(), duration: g.duration, tweens: [], createTween: function (K, Q) { var T = h.Tween(b, I.opts, K, Q, I.opts.specialEasing[K] || I.opts.easing); I.tweens.push(T); return T }, stop: function (K) { var Q = 0, T = K ? I.tweens.length : 0; if (l) return this; for (l = !0; Q < T; Q++)I.tweens[Q].run(1); K ? v.resolveWith(b, [I, K]) : v.rejectWith(b, [I, K]); return this } }); g = I.props; for (mb(g, I.opts.specialEasing); r <
            t; r++)if (c = rc[r].call(I, b, g, I.opts)) return c; h.map(g, Ca, I); h.isFunction(I.opts.start) && I.opts.start.call(b, I); h.fx.timer(h.extend(C, { elem: b, anim: I, queue: I.opts.queue })); return I.progress(I.opts.progress).done(I.opts.done, I.opts.complete).fail(I.opts.fail).always(I.opts.always)
    } function yb(b) { return function (c, g) { "string" !== typeof c && (g = c, c = "*"); var l, r = 0, t = c.toLowerCase().match(Kb) || []; if (h.isFunction(g)) for (; l = t[r++];)"+" === l.charAt(0) ? (l = l.slice(1) || "*", (b[l] = b[l] || []).unshift(g)) : (b[l] = b[l] || []).push(g) } }
    function gb(b, c, g, l) { function r(C) { var I; t[C] = !0; h.each(b[C] || [], function (K, Q) { var T = Q(c, g, l); if ("string" === typeof T && !v && !t[T]) return c.dataTypes.unshift(T), r(T), !1; if (v) return !(I = T) }); return I } var t = {}, v = b === wc; return r(c.dataTypes[0]) || !t["*"] && r("*") } function ra(b, c) { var g, l, r = h.ajaxSettings.flatOptions || {}; for (l in c) void 0 !== c[l] && ((r[l] ? b : g || (g = {}))[l] = c[l]); g && h.extend(!0, b, g); return b } function Ac(b, c, g, l) {
        var r; if (h.isArray(c)) h.each(c, function (t, v) {
            g || Dd.test(b) ? l(b, v) : Ac(b + "[" + ("object" ===
                typeof v ? t : "") + "]", v, g, l)
        }); else if (g || "object" !== h.type(c)) l(b, c); else for (r in c) Ac(b + "[" + r + "]", c[r], g, l)
    } function Oc() { try { return new d.XMLHttpRequest } catch (b) { } } function Pc(b) { return h.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1 } var Mb = [], bc = Mb.slice, kc = Mb.concat, od = Mb.push, Ed = Mb.indexOf, Qc = {}, ce = Qc.toString, uc = Qc.hasOwnProperty, qd = "".trim, da = {}, h = function (b, c) { return new h.fn.init(b, c) }, Gd = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ge = /^-ms-/, Kd = /-([\da-z])/gi, je = function (b, c) { return c.toUpperCase() };
    h.fn = h.prototype = {
        jquery: "1.11.0", constructor: h, selector: "", length: 0, toArray: function () { return bc.call(this) }, get: function (b) { return null != b ? 0 > b ? this[b + this.length] : this[b] : bc.call(this) }, pushStack: function (b) { b = h.merge(this.constructor(), b); b.prevObject = this; b.context = this.context; return b }, each: function (b, c) { return h.each(this, b, c) }, map: function (b) { return this.pushStack(h.map(this, function (c, g) { return b.call(c, g, c) })) }, slice: function () { return this.pushStack(bc.apply(this, arguments)) }, first: function () { return this.eq(0) },
        last: function () { return this.eq(-1) }, eq: function (b) { var c = this.length; b = +b + (0 > b ? c : 0); return this.pushStack(0 <= b && b < c ? [this[b]] : []) }, end: function () { return this.prevObject || this.constructor(null) }, push: od, sort: Mb.sort, splice: Mb.splice
    }; h.extend = h.fn.extend = function () {
        var b, c, g, l = arguments[0] || {}, r = 1, t = arguments.length, v = !1; "boolean" === typeof l && (v = l, l = arguments[r] || {}, r++); "object" === typeof l || h.isFunction(l) || (l = {}); r === t && (l = this, r--); for (; r < t; r++)if (null != (g = arguments[r])) for (c in g) {
            var C = l[c]; var I =
                g[c]; l !== I && (v && I && (h.isPlainObject(I) || (b = h.isArray(I))) ? (b ? (b = !1, C = C && h.isArray(C) ? C : []) : C = C && h.isPlainObject(C) ? C : {}, l[c] = h.extend(v, C, I)) : void 0 !== I && (l[c] = I))
        } return l
    }; h.extend({
        expando: "jQuery" + ("1.11.0" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (b) { throw Error(b); }, noop: function () { }, isFunction: function (b) { return "function" === h.type(b) }, isArray: Array.isArray || function (b) { return "array" === h.type(b) }, isWindow: function (b) { return null != b && b == b.window }, isNumeric: function (b) {
            return 0 <=
                b - parseFloat(b)
        }, isEmptyObject: function (b) { for (var c in b) return !1; return !0 }, isPlainObject: function (b) { var c; if (!b || "object" !== h.type(b) || b.nodeType || h.isWindow(b)) return !1; try { if (b.constructor && !uc.call(b, "constructor") && !uc.call(b.constructor.prototype, "isPrototypeOf")) return !1 } catch (g) { return !1 } if (da.ownLast) for (c in b) return uc.call(b, c); for (c in b); return void 0 === c || uc.call(b, c) }, type: function (b) { return null == b ? b + "" : "object" === typeof b || "function" === typeof b ? Qc[ce.call(b)] || "object" : typeof b },
        globalEval: function (b) { b && h.trim(b) && (d.execScript || function (c) { d.eval.call(d, c) })(b) }, camelCase: function (b) { return b.replace(ge, "ms-").replace(Kd, je) }, nodeName: function (b, c) { return b.nodeName && b.nodeName.toLowerCase() === c.toLowerCase() }, each: function (b, c, g) {
            var l = 0, r = b.length; var t = f(b); if (g) if (t) for (; l < r && (t = c.apply(b[l], g), !1 !== t); l++); else for (l in b) { if (t = c.apply(b[l], g), !1 === t) break } else if (t) for (; l < r && (t = c.call(b[l], l, b[l]), !1 !== t); l++); else for (l in b) if (t = c.call(b[l], l, b[l]), !1 === t) break;
            return b
        }, trim: qd && !qd.call("\ufeff\u00a0") ? function (b) { return null == b ? "" : qd.call(b) } : function (b) { return null == b ? "" : (b + "").replace(Gd, "") }, makeArray: function (b, c) { var g = c || []; null != b && (f(Object(b)) ? h.merge(g, "string" === typeof b ? [b] : b) : od.call(g, b)); return g }, inArray: function (b, c, g) { if (c) { if (Ed) return Ed.call(c, b, g); var l = c.length; for (g = g ? 0 > g ? Math.max(0, l + g) : g : 0; g < l; g++)if (g in c && c[g] === b) return g } return -1 }, merge: function (b, c) {
            for (var g = +c.length, l = 0, r = b.length; l < g;)b[r++] = c[l++]; if (g !== g) for (; void 0 !==
                c[l];)b[r++] = c[l++]; b.length = r; return b
        }, grep: function (b, c, g) { for (var l = [], r = 0, t = b.length, v = !g; r < t; r++)g = !c(b[r], r), g !== v && l.push(b[r]); return l }, map: function (b, c, g) { var l = 0, r = b.length, t = []; if (f(b)) for (; l < r; l++) { var v = c(b[l], l, g); null != v && t.push(v) } else for (l in b) v = c(b[l], l, g), null != v && t.push(v); return kc.apply([], t) }, guid: 1, proxy: function (b, c) {
            if ("string" === typeof c) { var g = b[c]; c = b; b = g } if (h.isFunction(b)) {
                var l = bc.call(arguments, 2); g = function () { return b.apply(c || this, l.concat(bc.call(arguments))) };
                g.guid = b.guid = b.guid || h.guid++; return g
            }
        }, now: function () { return +new Date }, support: da
    }); h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (b, c) { Qc["[object " + c + "]"] = c.toLowerCase() }); var vc = function (b) {
        function c(w, F, A, O) {
            var P, R, Z, la; (F ? F.ownerDocument || F : Ea) !== ma && fc(F); F = F || ma; A = A || []; if (!w || "string" !== typeof w) return A; if (1 !== (la = F.nodeType) && 9 !== la) return []; if (Sa && !O) {
                if (P = Yc.exec(w)) if (Z = P[1]) if (9 === la) if ((R = F.getElementById(Z)) && R.parentNode) {
                    if (R.id ===
                        Z) return A.push(R), A
                } else return A; else { if (F.ownerDocument && (R = F.ownerDocument.getElementById(Z)) && sb(F, R) && R.id === Z) return A.push(R), A } else { if (P[2]) return Bb.apply(A, F.getElementsByTagName(w)), A; if ((Z = P[3]) && bb.getElementsByClassName && F.getElementsByClassName) return Bb.apply(A, F.getElementsByClassName(Z)), A } if (bb.qsa && (!wa || !wa.test(w))) {
                    R = P = Ma; Z = F; var ca = 9 === la && w; if (1 === la && "object" !== F.nodeName.toLowerCase()) {
                        la = X(w); (P = F.getAttribute("id")) ? R = P.replace(Id, "\\$&") : F.setAttribute("id", R); R = "[id='" +
                            R + "'] "; for (Z = la.length; Z--;)la[Z] = R + xa(la[Z]); Z = Fc.test(w) && Q(F.parentNode) || F; ca = la.join(",")
                    } if (ca) try { return Bb.apply(A, Z.querySelectorAll(ca)), A } catch (Ha) { } finally { P || F.removeAttribute("id") }
                }
            } var oa; a: {
                w = w.replace(pc, "$1"); R = X(w); if (!O && 1 === R.length) {
                    P = R[0] = R[0].slice(0); if (2 < P.length && "ID" === (oa = P[0]).type && bb.getById && 9 === F.nodeType && Sa && Ia.relative[P[1].type]) { F = (Ia.find.ID(oa.matches[0].replace(Jb, Ub), F) || [])[0]; if (!F) { oa = A; break a } w = w.slice(P.shift().value.length) } for (la = mc.needsContext.test(w) ?
                        0 : P.length; la--;) { oa = P[la]; if (Ia.relative[Z = oa.type]) break; if (Z = Ia.find[Z]) if (O = Z(oa.matches[0].replace(Jb, Ub), Fc.test(P[0].type) && Q(F.parentNode) || F)) { P.splice(la, 1); w = O.length && xa(P); if (!w) { Bb.apply(A, O); oa = A; break a } break } }
                } Lc(w, R)(O, F, !Sa, A, Fc.test(w) && Q(F.parentNode) || F); oa = A
            } return oa
        } function g() { function w(A, O) { F.push(A + " ") > Ia.cacheLength && delete w[F.shift()]; return w[A + " "] = O } var F = []; return w } function l(w) { w[Ma] = !0; return w } function r(w) {
            var F = ma.createElement("div"); try { return !!w(F) } catch (A) { return !1 } finally {
                F.parentNode &&
                F.parentNode.removeChild(F)
            }
        } function t(w, F) { for (var A = w.split("|"), O = w.length; O--;)Ia.attrHandle[A[O]] = F } function v(w, F) { var A = F && w, O = A && 1 === w.nodeType && 1 === F.nodeType && (~F.sourceIndex || -2147483648) - (~w.sourceIndex || -2147483648); if (O) return O; if (A) for (; A = A.nextSibling;)if (A === F) return -1; return w ? 1 : -1 } function C(w) { return function (F) { return "input" === F.nodeName.toLowerCase() && F.type === w } } function I(w) { return function (F) { var A = F.nodeName.toLowerCase(); return ("input" === A || "button" === A) && F.type === w } }
        function K(w) { return l(function (F) { F = +F; return l(function (A, O) { for (var P, R = w([], A.length, F), Z = R.length; Z--;)A[P = R[Z]] && (A[P] = !(O[P] = A[P])) }) }) } function Q(w) { return w && "undefined" !== typeof w.getElementsByTagName && w } function T() { } function X(w, F) {
            var A, O, P, R, Z; if (R = ba[w + " "]) return F ? 0 : R.slice(0); R = w; var la = []; for (Z = Ia.preFilter; R;) {
                if (!ca || (A = rd.exec(R))) A && (R = R.slice(A[0].length) || R), la.push(O = []); var ca = !1; if (A = Nb.exec(R)) ca = A.shift(), O.push({ value: ca, type: A[0].replace(pc, " ") }), R = R.slice(ca.length);
                for (P in Ia.filter) !(A = mc[P].exec(R)) || Z[P] && !(A = Z[P](A)) || (ca = A.shift(), O.push({ value: ca, type: P, matches: A }), R = R.slice(ca.length)); if (!ca) break
            } return F ? R.length : R ? c.error(w) : ba(w, la).slice(0)
        } function xa(w) { for (var F = 0, A = w.length, O = ""; F < A; F++)O += w[F].value; return O } function La(w, F, A) {
            var O = F.dir, P = A && "parentNode" === O, R = xb++; return F.first ? function (Z, la, ca) { for (; Z = Z[O];)if (1 === Z.nodeType || P) return w(Z, la, ca) } : function (Z, la, ca) {
                var oa, Ha = [Ua, R]; if (ca) for (; Z = Z[O];) { if ((1 === Z.nodeType || P) && w(Z, la, ca)) return !0 } else for (; Z =
                    Z[O];)if (1 === Z.nodeType || P) { var Aa = Z[Ma] || (Z[Ma] = {}); if ((oa = Aa[O]) && oa[0] === Ua && oa[1] === R) return Ha[2] = oa[2]; Aa[O] = Ha; if (Ha[2] = w(Z, la, ca)) return !0 }
            }
        } function nb(w) { return 1 < w.length ? function (F, A, O) { for (var P = w.length; P--;)if (!w[P](F, A, O)) return !1; return !0 } : w[0] } function Qa(w, F, A, O, P) { for (var R, Z = [], la = 0, ca = w.length, oa = null != F; la < ca; la++)if (R = w[la]) if (!A || A(R, O, P)) Z.push(R), oa && F.push(la); return Z } function Xa(w, F, A, O, P, R) {
            O && !O[Ma] && (O = Xa(O)); P && !P[Ma] && (P = Xa(P, R)); return l(function (Z, la, ca, oa) {
                var Ha,
                Aa = [], Va = [], tb = la.length, Ga; if (!(Ga = Z)) { Ga = F || "*"; for (var Ja = ca.nodeType ? [ca] : ca, kb = [], cb = 0, Ec = Ja.length; cb < Ec; cb++)c(Ga, Ja[cb], kb); Ga = kb } Ga = !w || !Z && F ? Ga : Qa(Ga, Aa, w, ca, oa); Ja = A ? P || (Z ? w : tb || O) ? [] : la : Ga; A && A(Ga, Ja, ca, oa); if (O) { var Cb = Qa(Ja, Va); O(Cb, [], ca, oa); for (ca = Cb.length; ca--;)if (Ha = Cb[ca]) Ja[Va[ca]] = !(Ga[Va[ca]] = Ha) } if (Z) {
                    if (P || w) {
                        if (P) { Cb = []; for (ca = Ja.length; ca--;)(Ha = Ja[ca]) && Cb.push(Ga[ca] = Ha); P(null, Ja = [], Cb, oa) } for (ca = Ja.length; ca--;)(Ha = Ja[ca]) && -1 < (Cb = P ? Ya.call(Z, Ha) : Aa[ca]) && (Z[Cb] = !(la[Cb] =
                            Ha))
                    }
                } else Ja = Qa(Ja === la ? Ja.splice(tb, Ja.length) : Ja), P ? P(null, la, Ja, oa) : Bb.apply(la, Ja)
            })
        } function Fb(w) {
            var F, A, O = w.length, P = Ia.relative[w[0].type]; var R = P || Ia.relative[" "]; for (var Z = P ? 1 : 0, la = La(function (Ha) { return Ha === F }, R, !0), ca = La(function (Ha) { return -1 < Ya.call(F, Ha) }, R, !0), oa = [function (Ha, Aa, Va) { return !P && (Va || Aa !== $a) || ((F = Aa).nodeType ? la(Ha, Aa, Va) : ca(Ha, Aa, Va)) }]; Z < O; Z++)if (R = Ia.relative[w[Z].type]) oa = [La(nb(oa), R)]; else {
                R = Ia.filter[w[Z].type].apply(null, w[Z].matches); if (R[Ma]) {
                    for (A = ++Z; A <
                        O && !Ia.relative[w[A].type]; A++); return Xa(1 < Z && nb(oa), 1 < Z && xa(w.slice(0, Z - 1).concat({ value: " " === w[Z - 2].type ? "*" : "" })).replace(pc, "$1"), R, Z < A && Fb(w.slice(Z, A)), A < O && Fb(w = w.slice(A)), A < O && xa(w))
                } oa.push(R)
            } return nb(oa)
        } function sa(w, F) {
            var A = 0 < F.length, O = 0 < w.length, P = function (R, Z, la, ca, oa) {
                var Ha, Aa, Va, tb = 0, Ga = "0", Ja = R && [], kb = [], cb = $a, Ec = R || O && Ia.find.TAG("*", oa), Cb = Ua += null == cb ? 1 : Math.random() || .1, Eb = Ec.length; for (oa && ($a = Z !== ma && Z); Ga !== Eb && null != (Ha = Ec[Ga]); Ga++) {
                    if (O && Ha) {
                        for (Aa = 0; Va = w[Aa++];)if (Va(Ha,
                            Z, la)) { ca.push(Ha); break } oa && (Ua = Cb)
                    } A && ((Ha = !Va && Ha) && tb--, R && Ja.push(Ha))
                } tb += Ga; if (A && Ga !== tb) { for (Aa = 0; Va = F[Aa++];)Va(Ja, kb, Z, la); if (R) { if (0 < tb) for (; Ga--;)Ja[Ga] || kb[Ga] || (kb[Ga] = zd.call(ca)); kb = Qa(kb) } Bb.apply(ca, kb); oa && !R && 0 < kb.length && 1 < tb + F.length && c.uniqueSort(ca) } oa && (Ua = Cb, $a = cb); return Ja
            }; return A ? l(P) : P
        } var Db, $a, ya, Ra, ma, hb, Sa, wa, za, qb, sb, Ma = "sizzle" + -new Date, Ea = b.document, Ua = 0, xb = 0, Ob = g(), ba = g(), fb = g(), Ab = function (w, F) { w === F && (Ra = !0); return 0 }, ob = {}.hasOwnProperty, Hb = [], zd = Hb.pop,
            ac = Hb.push, Bb = Hb.push, ud = Hb.slice, Ya = Hb.indexOf || function (w) { for (var F = 0, A = this.length; F < A; F++)if (this[F] === w) return F; return -1 }, ec = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"), ab = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ec + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", vb = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ab.replace(3, 8) + ")*)|.*)\\)|)",
            pc = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), rd = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, Nb = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, ad = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*?)[\\x20\\t\\r\\n\\f]*\\]", "g"), Xc = new RegExp(vb), Jd = new RegExp("^" + ec + "$"), mc = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: new RegExp("^" + ab), PSEUDO: new RegExp("^" +
                    vb), CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i, bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i, needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
            }, Vc = /^(?:input|select|textarea|button)$/i, Zc = /^h\d$/i,
            cc = /^[^{]+\{\s*\[native \w/, Yc = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Fc = /[+~]/, Id = /'|\\/g, Jb = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), Ub = function (w, F, A) { w = "0x" + F - 65536; return w !== w || A ? F : 0 > w ? String.fromCharCode(w + 65536) : String.fromCharCode(w >> 10 | 55296, w & 1023 | 56320) }; try { Bb.apply(Hb = ud.call(Ea.childNodes), Ea.childNodes), Hb[Ea.childNodes.length].nodeType } catch (w) {
                Bb = {
                    apply: Hb.length ? function (F, A) { ac.apply(F, ud.call(A)) } : function (F, A) {
                        for (var O = F.length, P = 0; F[O++] = A[P++];);
                        F.length = O - 1
                    }
                }
            } var bb = c.support = {}; var ue = c.isXML = function (w) { return (w = w && (w.ownerDocument || w).documentElement) ? "HTML" !== w.nodeName : !1 }; var fc = c.setDocument = function (w) {
                var F = w ? w.ownerDocument || w : Ea; w = F.defaultView; if (F === ma || 9 !== F.nodeType || !F.documentElement) return ma; ma = F; hb = F.documentElement; Sa = !ue(F); w && w !== w.top && (w.addEventListener ? w.addEventListener("unload", function () { fc() }, !1) : w.attachEvent && w.attachEvent("onunload", function () { fc() })); bb.attributes = r(function (A) { A.className = "i"; return !A.getAttribute("className") });
                bb.getElementsByTagName = r(function (A) { A.appendChild(F.createComment("")); return !A.getElementsByTagName("*").length }); bb.getElementsByClassName = cc.test(F.getElementsByClassName) && r(function (A) { A.innerHTML = "<div class='a'></div><div class='a i'></div>"; A.firstChild.className = "i"; return 2 === A.getElementsByClassName("i").length }); bb.getById = r(function (A) { hb.appendChild(A).id = Ma; return !F.getElementsByName || !F.getElementsByName(Ma).length }); bb.getById ? (Ia.find.ID = function (A, O) {
                    if ("undefined" !== typeof O.getElementById &&
                        Sa) { var P = O.getElementById(A); return P && P.parentNode ? [P] : [] }
                }, Ia.filter.ID = function (A) { var O = A.replace(Jb, Ub); return function (P) { return P.getAttribute("id") === O } }) : (delete Ia.find.ID, Ia.filter.ID = function (A) { var O = A.replace(Jb, Ub); return function (P) { return (P = "undefined" !== typeof P.getAttributeNode && P.getAttributeNode("id")) && P.value === O } }); Ia.find.TAG = bb.getElementsByTagName ? function (A, O) { if ("undefined" !== typeof O.getElementsByTagName) return O.getElementsByTagName(A) } : function (A, O) {
                    var P, R = [], Z = 0,
                    la = O.getElementsByTagName(A); if ("*" === A) { for (; P = la[Z++];)1 === P.nodeType && R.push(P); return R } return la
                }; Ia.find.CLASS = bb.getElementsByClassName && function (A, O) { if ("undefined" !== typeof O.getElementsByClassName && Sa) return O.getElementsByClassName(A) }; za = []; wa = []; if (bb.qsa = cc.test(F.querySelectorAll)) r(function (A) {
                    A.innerHTML = "<select t=''><option selected=''></option></select>"; A.querySelectorAll("[t^='']").length && wa.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"); A.querySelectorAll("[selected]").length ||
                        wa.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)"); A.querySelectorAll(":checked").length || wa.push(":checked")
                }), r(function (A) {
                    var O = F.createElement("input"); O.setAttribute("type", "hidden"); A.appendChild(O).setAttribute("name", "D"); A.querySelectorAll("[name=d]").length && wa.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="); A.querySelectorAll(":enabled").length || wa.push(":enabled", ":disabled");
                    A.querySelectorAll("*,:x"); wa.push(",.*:")
                }); (bb.matchesSelector = cc.test(qb = hb.webkitMatchesSelector || hb.mozMatchesSelector || hb.oMatchesSelector || hb.msMatchesSelector)) && r(function (A) { bb.disconnectedMatch = qb.call(A, "div"); qb.call(A, "[s!='']:x"); za.push("!=", vb) }); wa = wa.length && new RegExp(wa.join("|")); za = za.length && new RegExp(za.join("|")); sb = (w = cc.test(hb.compareDocumentPosition)) || cc.test(hb.contains) ? function (A, O) {
                    var P = 9 === A.nodeType ? A.documentElement : A, R = O && O.parentNode; return A === R || !!(R && 1 ===
                        R.nodeType && (P.contains ? P.contains(R) : A.compareDocumentPosition && A.compareDocumentPosition(R) & 16))
                } : function (A, O) { if (O) for (; O = O.parentNode;)if (O === A) return !0; return !1 }; Ab = w ? function (A, O) {
                    if (A === O) return Ra = !0, 0; var P = !A.compareDocumentPosition - !O.compareDocumentPosition; if (P) return P; P = (A.ownerDocument || A) === (O.ownerDocument || O) ? A.compareDocumentPosition(O) : 1; return P & 1 || !bb.sortDetached && O.compareDocumentPosition(A) === P ? A === F || A.ownerDocument === Ea && sb(Ea, A) ? -1 : O === F || O.ownerDocument === Ea && sb(Ea,
                        O) ? 1 : ya ? Ya.call(ya, A) - Ya.call(ya, O) : 0 : P & 4 ? -1 : 1
                } : function (A, O) { if (A === O) return Ra = !0, 0; var P = 0; var R = A.parentNode; var Z = O.parentNode, la = [A], ca = [O]; if (!R || !Z) return A === F ? -1 : O === F ? 1 : R ? -1 : Z ? 1 : ya ? Ya.call(ya, A) - Ya.call(ya, O) : 0; if (R === Z) return v(A, O); for (R = A; R = R.parentNode;)la.unshift(R); for (R = O; R = R.parentNode;)ca.unshift(R); for (; la[P] === ca[P];)P++; return P ? v(la[P], ca[P]) : la[P] === Ea ? -1 : ca[P] === Ea ? 1 : 0 }; return F
            }; c.matches = function (w, F) { return c(w, null, null, F) }; c.matchesSelector = function (w, F) {
                (w.ownerDocument ||
                    w) !== ma && fc(w); F = F.replace(ad, "='$1']"); if (!(!bb.matchesSelector || !Sa || za && za.test(F) || wa && wa.test(F))) try { var A = qb.call(w, F); if (A || bb.disconnectedMatch || w.document && 11 !== w.document.nodeType) return A } catch (O) { } return 0 < c(F, ma, null, [w]).length
            }; c.contains = function (w, F) { (w.ownerDocument || w) !== ma && fc(w); return sb(w, F) }; c.attr = function (w, F) {
                (w.ownerDocument || w) !== ma && fc(w); var A = Ia.attrHandle[F.toLowerCase()]; A = A && ob.call(Ia.attrHandle, F.toLowerCase()) ? A(w, F, !Sa) : void 0; return void 0 !== A ? A : bb.attributes ||
                    !Sa ? w.getAttribute(F) : (A = w.getAttributeNode(F)) && A.specified ? A.value : null
            }; c.error = function (w) { throw Error("Syntax error, unrecognized expression: " + w); }; c.uniqueSort = function (w) { var F, A = [], O = 0, P = 0; Ra = !bb.detectDuplicates; ya = !bb.sortStable && w.slice(0); w.sort(Ab); if (Ra) { for (; F = w[P++];)F === w[P] && (O = A.push(P)); for (; O--;)w.splice(A[O], 1) } ya = null; return w }; var dd = c.getText = function (w) {
                var F = "", A = 0; var O = w.nodeType; if (!O) for (; O = w[A++];)F += dd(O); else if (1 === O || 9 === O || 11 === O) {
                    if ("string" === typeof w.textContent) return w.textContent;
                    for (w = w.firstChild; w; w = w.nextSibling)F += dd(w)
                } else if (3 === O || 4 === O) return w.nodeValue; return F
            }; var Ia = c.selectors = {
                cacheLength: 50, createPseudo: l, match: mc, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: {
                    ATTR: function (w) { w[1] = w[1].replace(Jb, Ub); w[3] = (w[4] || w[5] || "").replace(Jb, Ub); "~=" === w[2] && (w[3] = " " + w[3] + " "); return w.slice(0, 4) }, CHILD: function (w) {
                        w[1] = w[1].toLowerCase(); "nth" ===
                            w[1].slice(0, 3) ? (w[3] || c.error(w[0]), w[4] = +(w[4] ? w[5] + (w[6] || 1) : 2 * ("even" === w[3] || "odd" === w[3])), w[5] = +(w[7] + w[8] || "odd" === w[3])) : w[3] && c.error(w[0]); return w
                    }, PSEUDO: function (w) { var F, A = !w[5] && w[2]; if (mc.CHILD.test(w[0])) return null; w[3] && void 0 !== w[4] ? w[2] = w[4] : A && Xc.test(A) && (F = X(A, !0)) && (F = A.indexOf(")", A.length - F) - A.length) && (w[0] = w[0].slice(0, F), w[2] = A.slice(0, F)); return w.slice(0, 3) }
                }, filter: {
                    TAG: function (w) {
                        var F = w.replace(Jb, Ub).toLowerCase(); return "*" === w ? function () { return !0 } : function (A) {
                            return A.nodeName &&
                                A.nodeName.toLowerCase() === F
                        }
                    }, CLASS: function (w) { var F = Ob[w + " "]; return F || (F = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + w + "([\\x20\\t\\r\\n\\f]|$)"), Ob(w, function (A) { return F.test("string" === typeof A.className && A.className || "undefined" !== typeof A.getAttribute && A.getAttribute("class") || "") })) }, ATTR: function (w, F, A) {
                        return function (O) {
                            O = c.attr(O, w); if (null == O) return "!=" === F; if (!F) return !0; O += ""; return "=" === F ? O === A : "!=" === F ? O !== A : "^=" === F ? A && 0 === O.indexOf(A) : "*=" === F ? A && -1 < O.indexOf(A) : "$=" === F ? A && O.slice(-A.length) ===
                                A : "~=" === F ? -1 < (" " + O + " ").indexOf(A) : "|=" === F ? O === A || O.slice(0, A.length + 1) === A + "-" : !1
                        }
                    }, CHILD: function (w, F, A, O, P) {
                        var R = "nth" !== w.slice(0, 3), Z = "last" !== w.slice(-4), la = "of-type" === F; return 1 === O && 0 === P ? function (ca) { return !!ca.parentNode } : function (ca, oa, Ha) {
                            var Aa; oa = R !== Z ? "nextSibling" : "previousSibling"; var Va = ca.parentNode, tb = la && ca.nodeName.toLowerCase(); Ha = !Ha && !la; if (Va) {
                                if (R) {
                                    for (; oa;) {
                                        for (Aa = ca; Aa = Aa[oa];)if (la ? Aa.nodeName.toLowerCase() === tb : 1 === Aa.nodeType) return !1; var Ga = oa = "only" === w && !Ga &&
                                            "nextSibling"
                                    } return !0
                                } Ga = [Z ? Va.firstChild : Va.lastChild]; if (Z && Ha) { Ha = Va[Ma] || (Va[Ma] = {}); var Ja = Ha[w] || []; var kb = Ja[0] === Ua && Ja[1]; var cb = Ja[0] === Ua && Ja[2]; for (Aa = kb && Va.childNodes[kb]; Aa = ++kb && Aa && Aa[oa] || (cb = kb = 0) || Ga.pop();)if (1 === Aa.nodeType && ++cb && Aa === ca) { Ha[w] = [Ua, kb, cb]; break } } else if (Ha && (Ja = (ca[Ma] || (ca[Ma] = {}))[w]) && Ja[0] === Ua) cb = Ja[1]; else for (; (Aa = ++kb && Aa && Aa[oa] || (cb = kb = 0) || Ga.pop()) && ((la ? Aa.nodeName.toLowerCase() !== tb : 1 !== Aa.nodeType) || !++cb || (Ha && ((Aa[Ma] || (Aa[Ma] = {}))[w] = [Ua, cb]),
                                    Aa !== ca));); cb -= P; return cb === O || 0 === cb % O && 0 <= cb / O
                            }
                        }
                    }, PSEUDO: function (w, F) { var A = Ia.pseudos[w] || Ia.setFilters[w.toLowerCase()] || c.error("unsupported pseudo: " + w); if (A[Ma]) return A(F); if (1 < A.length) { var O = [w, w, "", F]; return Ia.setFilters.hasOwnProperty(w.toLowerCase()) ? l(function (P, R) { for (var Z, la = A(P, F), ca = la.length; ca--;)Z = Ya.call(P, la[ca]), P[Z] = !(R[Z] = la[ca]) }) : function (P) { return A(P, 0, O) } } return A }
                }, pseudos: {
                    not: l(function (w) {
                        var F = [], A = [], O = Lc(w.replace(pc, "$1")); return O[Ma] ? l(function (P, R, Z,
                            la) { la = O(P, null, la, []); for (var ca = P.length; ca--;)if (Z = la[ca]) P[ca] = !(R[ca] = Z) }) : function (P, R, Z) { F[0] = P; O(F, null, Z, A); return !A.pop() }
                    }), has: l(function (w) { return function (F) { return 0 < c(w, F).length } }), contains: l(function (w) { return function (F) { return -1 < (F.textContent || F.innerText || dd(F)).indexOf(w) } }), lang: l(function (w) {
                        Jd.test(w || "") || c.error("unsupported lang: " + w); w = w.replace(Jb, Ub).toLowerCase(); return function (F) {
                            var A; do if (A = Sa ? F.lang : F.getAttribute("xml:lang") || F.getAttribute("lang")) return A =
                                A.toLowerCase(), A === w || 0 === A.indexOf(w + "-"); while ((F = F.parentNode) && 1 === F.nodeType); return !1
                        }
                    }), target: function (w) { var F = b.location && b.location.hash; return F && F.slice(1) === w.id }, root: function (w) { return w === hb }, focus: function (w) { return w === ma.activeElement && (!ma.hasFocus || ma.hasFocus()) && !!(w.type || w.href || ~w.tabIndex) }, enabled: function (w) { return !1 === w.disabled }, disabled: function (w) { return !0 === w.disabled }, checked: function (w) {
                        var F = w.nodeName.toLowerCase(); return "input" === F && !!w.checked || "option" ===
                            F && !!w.selected
                    }, selected: function (w) { w.parentNode && w.parentNode.selectedIndex; return !0 === w.selected }, empty: function (w) { for (w = w.firstChild; w; w = w.nextSibling)if (6 > w.nodeType) return !1; return !0 }, parent: function (w) { return !Ia.pseudos.empty(w) }, header: function (w) { return Zc.test(w.nodeName) }, input: function (w) { return Vc.test(w.nodeName) }, button: function (w) { var F = w.nodeName.toLowerCase(); return "input" === F && "button" === w.type || "button" === F }, text: function (w) {
                        var F; return "input" === w.nodeName.toLowerCase() && "text" ===
                            w.type && (null == (F = w.getAttribute("type")) || "text" === F.toLowerCase())
                    }, first: K(function () { return [0] }), last: K(function (w, F) { return [F - 1] }), eq: K(function (w, F, A) { return [0 > A ? A + F : A] }), even: K(function (w, F) { for (var A = 0; A < F; A += 2)w.push(A); return w }), odd: K(function (w, F) { for (var A = 1; A < F; A += 2)w.push(A); return w }), lt: K(function (w, F, A) { for (F = 0 > A ? A + F : A; 0 <= --F;)w.push(F); return w }), gt: K(function (w, F, A) { for (A = 0 > A ? A + F : A; ++A < F;)w.push(A); return w })
                }
            }; Ia.pseudos.nth = Ia.pseudos.eq; for (Db in {
                radio: !0, checkbox: !0, file: !0,
                password: !0, image: !0
            }) Ia.pseudos[Db] = C(Db); for (Db in { submit: !0, reset: !0 }) Ia.pseudos[Db] = I(Db); T.prototype = Ia.filters = Ia.pseudos; Ia.setFilters = new T; var Lc = c.compile = function (w, F) { var A, O = [], P = [], R = fb[w + " "]; if (!R) { F || (F = X(w)); for (A = F.length; A--;)R = Fb(F[A]), R[Ma] ? O.push(R) : P.push(R); R = fb(w, sa(P, O)) } return R }; bb.sortStable = Ma.split("").sort(Ab).join("") === Ma; bb.detectDuplicates = !!Ra; fc(); bb.sortDetached = r(function (w) { return w.compareDocumentPosition(ma.createElement("div")) & 1 }); r(function (w) {
                w.innerHTML =
                "<a href='#'></a>"; return "#" === w.firstChild.getAttribute("href")
            }) || t("type|href|height|width", function (w, F, A) { if (!A) return w.getAttribute(F, "type" === F.toLowerCase() ? 1 : 2) }); bb.attributes && r(function (w) { w.innerHTML = "<input/>"; w.firstChild.setAttribute("value", ""); return "" === w.firstChild.getAttribute("value") }) || t("value", function (w, F, A) { if (!A && "input" === w.nodeName.toLowerCase()) return w.defaultValue }); r(function (w) { return null == w.getAttribute("disabled") }) || t("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                function (w, F, A) { var O; if (!A) return !0 === w[F] ? F.toLowerCase() : (O = w.getAttributeNode(F)) && O.specified ? O.value : null }); return c
    }(d); h.find = vc; h.expr = vc.selectors; h.expr[":"] = h.expr.pseudos; h.unique = vc.uniqueSort; h.text = vc.getText; h.isXMLDoc = vc.isXML; h.contains = vc.contains; var Md = h.expr.match.needsContext, Td = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ee = /^.[^:#\[\.,]*$/; h.filter = function (b, c, g) {
        var l = c[0]; g && (b = ":not(" + b + ")"); return 1 === c.length && 1 === l.nodeType ? h.find.matchesSelector(l, b) ? [l] : [] : h.find.matches(b, h.grep(c,
            function (r) { return 1 === r.nodeType }))
    }; h.fn.extend({
        find: function (b) { var c, g = [], l = this, r = l.length; if ("string" !== typeof b) return this.pushStack(h(b).filter(function () { for (c = 0; c < r; c++)if (h.contains(l[c], this)) return !0 })); for (c = 0; c < r; c++)h.find(b, l[c], g); g = this.pushStack(1 < r ? h.unique(g) : g); g.selector = this.selector ? this.selector + " " + b : b; return g }, filter: function (b) { return this.pushStack(a(this, b || [], !1)) }, not: function (b) { return this.pushStack(a(this, b || [], !0)) }, is: function (b) {
            return !!a(this, "string" ===
                typeof b && Md.test(b) ? h(b) : b || [], !1).length
        }
    }); var ia = d.document, Ld = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; (h.fn.init = function (b, c) {
        var g; if (!b) return this; if ("string" === typeof b) {
            var l = "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? [null, b, null] : Ld.exec(b); if (!l || !l[1] && c) return !c || c.jquery ? (c || Cc).find(b) : this.constructor(c).find(b); if (l[1]) {
                if (c = c instanceof h ? c[0] : c, h.merge(this, h.parseHTML(l[1], c && c.nodeType ? c.ownerDocument || c : ia, !0)), Td.test(l[1]) && h.isPlainObject(c)) for (l in c) if (h.isFunction(this[l])) this[l](c[l]);
                else this.attr(l, c[l])
            } else { if ((g = ia.getElementById(l[2])) && g.parentNode) { if (g.id !== l[2]) return Cc.find(b); this.length = 1; this[0] = g } this.context = ia; this.selector = b } return this
        } if (b.nodeType) return this.context = this[0] = b, this.length = 1, this; if (h.isFunction(b)) return "undefined" !== typeof Cc.ready ? Cc.ready(b) : b(h); void 0 !== b.selector && (this.selector = b.selector, this.context = b.context); return h.makeArray(b, this)
    }).prototype = h.fn; var Cc = h(ia); var Fd = /^(?:parents|prev(?:Until|All))/, td = {
        children: !0, contents: !0,
        next: !0, prev: !0
    }; h.extend({ dir: function (b, c, g) { var l = []; for (b = b[c]; b && 9 !== b.nodeType && (void 0 === g || 1 !== b.nodeType || !h(b).is(g));)1 === b.nodeType && l.push(b), b = b[c]; return l }, sibling: function (b, c) { for (var g = []; b; b = b.nextSibling)1 === b.nodeType && b !== c && g.push(b); return g } }); h.fn.extend({
        has: function (b) { var c, g = h(b, this), l = g.length; return this.filter(function () { for (c = 0; c < l; c++)if (h.contains(this, g[c])) return !0 }) }, closest: function (b, c) {
            for (var g, l = 0, r = this.length, t = [], v = Md.test(b) || "string" !== typeof b ? h(b,
                c || this.context) : 0; l < r; l++)for (g = this[l]; g && g !== c; g = g.parentNode)if (11 > g.nodeType && (v ? -1 < v.index(g) : 1 === g.nodeType && h.find.matchesSelector(g, b))) { t.push(g); break } return this.pushStack(1 < t.length ? h.unique(t) : t)
        }, index: function (b) { return b ? "string" === typeof b ? h.inArray(this[0], h(b)) : h.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (b, c) { return this.pushStack(h.unique(h.merge(this.get(), h(b, c)))) }, addBack: function (b) {
            return this.add(null == b ? this.prevObject :
                this.prevObject.filter(b))
        }
    }); h.each({
        parent: function (b) { return (b = b.parentNode) && 11 !== b.nodeType ? b : null }, parents: function (b) { return h.dir(b, "parentNode") }, parentsUntil: function (b, c, g) { return h.dir(b, "parentNode", g) }, next: function (b) { return e(b, "nextSibling") }, prev: function (b) { return e(b, "previousSibling") }, nextAll: function (b) { return h.dir(b, "nextSibling") }, prevAll: function (b) { return h.dir(b, "previousSibling") }, nextUntil: function (b, c, g) { return h.dir(b, "nextSibling", g) }, prevUntil: function (b, c, g) {
            return h.dir(b,
                "previousSibling", g)
        }, siblings: function (b) { return h.sibling((b.parentNode || {}).firstChild, b) }, children: function (b) { return h.sibling(b.firstChild) }, contents: function (b) { return h.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : h.merge([], b.childNodes) }
    }, function (b, c) { h.fn[b] = function (g, l) { var r = h.map(this, c, g); "Until" !== b.slice(-5) && (l = g); l && "string" === typeof l && (r = h.filter(l, r)); 1 < this.length && (td[b] || (r = h.unique(r)), Fd.test(b) && (r = r.reverse())); return this.pushStack(r) } }); var Kb =
        /\S+/g, Nd = {}; h.Callbacks = function (b) {
            b = "string" === typeof b ? Nd[b] || k(b) : h.extend({}, b); var c, g, l, r, t, v, C = [], I = !b.once && [], K = function (T) { g = b.memory && T; l = !0; t = v || 0; v = 0; r = C.length; for (c = !0; C && t < r; t++)if (!1 === C[t].apply(T[0], T[1]) && b.stopOnFalse) { g = !1; break } c = !1; C && (I ? I.length && K(I.shift()) : g ? C = [] : Q.disable()) }, Q = {
                add: function () {
                    if (C) {
                        var T = C.length; (function La(xa) { h.each(xa, function (nb, Qa) { var Xa = h.type(Qa); "function" === Xa ? b.unique && Q.has(Qa) || C.push(Qa) : Qa && Qa.length && "string" !== Xa && La(Qa) }) })(arguments);
                        c ? r = C.length : g && (v = T, K(g))
                    } return this
                }, remove: function () { C && h.each(arguments, function (T, X) { for (var xa; -1 < (xa = h.inArray(X, C, xa));)C.splice(xa, 1), c && (xa <= r && r--, xa <= t && t--) }); return this }, has: function (T) { return T ? -1 < h.inArray(T, C) : !(!C || !C.length) }, empty: function () { C = []; r = 0; return this }, disable: function () { C = I = g = void 0; return this }, disabled: function () { return !C }, lock: function () { I = void 0; g || Q.disable(); return this }, locked: function () { return !I }, fireWith: function (T, X) {
                    !C || l && !I || (X = X || [], X = [T, X.slice ? X.slice() :
                        X], c ? I.push(X) : K(X)); return this
                }, fire: function () { Q.fireWith(this, arguments); return this }, fired: function () { return !!l }
            }; return Q
        }; h.extend({
            Deferred: function (b) {
                var c = [["resolve", "done", h.Callbacks("once memory"), "resolved"], ["reject", "fail", h.Callbacks("once memory"), "rejected"], ["notify", "progress", h.Callbacks("memory")]], g = "pending", l = {
                    state: function () { return g }, always: function () { r.done(arguments).fail(arguments); return this }, then: function () {
                        var t = arguments; return h.Deferred(function (v) {
                            h.each(c,
                                function (C, I) { var K = h.isFunction(t[C]) && t[C]; r[I[1]](function () { var Q = K && K.apply(this, arguments); if (Q && h.isFunction(Q.promise)) Q.promise().done(v.resolve).fail(v.reject).progress(v.notify); else v[I[0] + "With"](this === l ? v.promise() : this, K ? [Q] : arguments) }) }); t = null
                        }).promise()
                    }, promise: function (t) { return null != t ? h.extend(t, l) : l }
                }, r = {}; l.pipe = l.then; h.each(c, function (t, v) {
                    var C = v[2], I = v[3]; l[v[1]] = C.add; I && C.add(function () { g = I }, c[t ^ 1][2].disable, c[2][2].lock); r[v[0]] = function () {
                        r[v[0] + "With"](this ===
                            r ? l : this, arguments); return this
                    }; r[v[0] + "With"] = C.fireWith
                }); l.promise(r); b && b.call(r, r); return r
            }, when: function (b) {
                var c = 0, g = bc.call(arguments), l = g.length, r = 1 !== l || b && h.isFunction(b.promise) ? l : 0, t = 1 === r ? b : h.Deferred(), v = function (Q, T, X) { return function (xa) { T[Q] = this; X[Q] = 1 < arguments.length ? bc.call(arguments) : xa; X === I ? t.notifyWith(T, X) : --r || t.resolveWith(T, X) } }, C; if (1 < l) {
                    var I = Array(l); var K = Array(l); for (C = Array(l); c < l; c++)g[c] && h.isFunction(g[c].promise) ? g[c].promise().done(v(c, C, g)).fail(t.reject).progress(v(c,
                        K, I)) : --r
                } r || t.resolveWith(C, g); return t.promise()
            }
        }); var cd; h.fn.ready = function (b) { h.ready.promise().done(b); return this }; h.extend({ isReady: !1, readyWait: 1, holdReady: function (b) { b ? h.readyWait++ : h.ready(!0) }, ready: function (b) { if (!0 === b ? !--h.readyWait : !h.isReady) { if (!ia.body) return setTimeout(h.ready); h.isReady = !0; !0 !== b && 0 < --h.readyWait || (cd.resolveWith(ia, [h]), h.fn.trigger && h(ia).trigger("ready").off("ready")) } } }); h.ready.promise = function (b) {
            if (!cd) if (cd = h.Deferred(), "complete" === ia.readyState) setTimeout(h.ready);
            else if (ia.addEventListener) ia.addEventListener("DOMContentLoaded", p, !1), d.addEventListener("load", p, !1); else { ia.attachEvent("onreadystatechange", p); d.attachEvent("onload", p); var c = !1; try { c = null == d.frameElement && ia.documentElement } catch (g) { } c && c.doScroll && function l() { if (!h.isReady) { try { c.doScroll("left") } catch (r) { return setTimeout(l, 50) } n(); h.ready() } }() } return cd.promise(b)
        }; for (var le in h(da)) break; da.ownLast = "0" !== le; da.inlineBlockNeedsLayout = !1; h(function () {
            var b = ia.getElementsByTagName("body")[0];
            if (b) { var c = ia.createElement("div"); c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"; var g = ia.createElement("div"); b.appendChild(c).appendChild(g); "undefined" !== typeof g.style.zoom && (g.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", da.inlineBlockNeedsLayout = 3 === g.offsetWidth) && (b.style.zoom = 1); b.removeChild(c) }
        }); (function () {
            var b = ia.createElement("div"); if (null == da.deleteExpando) {
                da.deleteExpando = !0; try { delete b.test } catch (c) {
                    da.deleteExpando =
                    !1
                }
            }
        })(); h.acceptData = function (b) { var c = h.noData[(b.nodeName + " ").toLowerCase()], g = +b.nodeType || 1; return 1 !== g && 9 !== g ? !1 : !c || !0 !== c && b.getAttribute("classid") === c }; var ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, de = /([A-Z])/g; h.extend({
            cache: {}, noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (b) { b = b.nodeType ? h.cache[b[h.expando]] : b[h.expando]; return !!b && !u(b) }, data: function (b, c, g) { return x(b, c, g) }, removeData: function (b, c) { return E(b, c) }, _data: function (b,
                c, g) { return x(b, c, g, !0) }, _removeData: function (b, c) { return E(b, c, !0) }
        }); h.fn.extend({
            data: function (b, c) {
                var g, l = this[0], r = l && l.attributes; if (void 0 === b) { if (this.length) { var t = h.data(l); if (1 === l.nodeType && !h._data(l, "parsedAttrs")) { for (g = r.length; g--;) { var v = r[g].name; 0 === v.indexOf("data-") && (v = h.camelCase(v.slice(5)), q(l, v, t[v])) } h._data(l, "parsedAttrs", !0) } } return t } return "object" === typeof b ? this.each(function () { h.data(this, b) }) : 1 < arguments.length ? this.each(function () { h.data(this, b, c) }) : l ? q(l, b, h.data(l,
                    b)) : void 0
            }, removeData: function (b) { return this.each(function () { h.removeData(this, b) }) }
        }); h.extend({
            queue: function (b, c, g) { if (b) { c = (c || "fx") + "queue"; var l = h._data(b, c); g && (!l || h.isArray(g) ? l = h._data(b, c, h.makeArray(g)) : l.push(g)); return l || [] } }, dequeue: function (b, c) { c = c || "fx"; var g = h.queue(b, c), l = g.length, r = g.shift(), t = h._queueHooks(b, c), v = function () { h.dequeue(b, c) }; "inprogress" === r && (r = g.shift(), l--); r && ("fx" === c && g.unshift("inprogress"), delete t.stop, r.call(b, v, t)); !l && t && t.empty.fire() }, _queueHooks: function (b,
                c) { var g = c + "queueHooks"; return h._data(b, g) || h._data(b, g, { empty: h.Callbacks("once memory").add(function () { h._removeData(b, c + "queue"); h._removeData(b, g) }) }) }
        }); h.fn.extend({
            queue: function (b, c) { var g = 2; "string" !== typeof b && (c = b, b = "fx", g--); return arguments.length < g ? h.queue(this[0], b) : void 0 === c ? this : this.each(function () { var l = h.queue(this, b, c); h._queueHooks(this, b); "fx" === b && "inprogress" !== l[0] && h.dequeue(this, b) }) }, dequeue: function (b) { return this.each(function () { h.dequeue(this, b) }) }, clearQueue: function (b) {
                return this.queue(b ||
                    "fx", [])
            }, promise: function (b, c) { var g, l = 1, r = h.Deferred(), t = this, v = this.length, C = function () { --l || r.resolveWith(t, [t]) }; "string" !== typeof b && (c = b, b = void 0); for (b = b || "fx"; v--;)(g = h._data(t[v], b + "queueHooks")) && g.empty && (l++, g.empty.add(C)); C(); return r.promise(c) }
        }); var Dc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Zb = ["Top", "Right", "Bottom", "Left"], Gc = function (b, c) { b = c || b; return "none" === h.css(b, "display") || !h.contains(b.ownerDocument, b) }, Rb = h.access = function (b, c, g, l, r, t, v) {
            var C = 0, I = b.length, K = null ==
                g; if ("object" === h.type(g)) for (C in r = !0, g) h.access(b, c, C, g[C], !0, t, v); else if (void 0 !== l && (r = !0, h.isFunction(l) || (v = !0), K && (v ? (c.call(b, l), c = null) : (K = c, c = function (Q, T, X) { return K.call(h(Q), X) })), c)) for (; C < I; C++)c(b[C], g, v ? l : l.call(b[C], C, c(b[C], g))); return r ? b : K ? c.call(b) : I ? c(b[0], g) : t
        }, Sc = /^(?:checkbox|radio)$/i; (function () {
            var b = ia.createDocumentFragment(), c = ia.createElement("div"), g = ia.createElement("input"); c.setAttribute("className", "t"); c.innerHTML = "  <link/><table></table><a href='/a'>a</a>";
            da.leadingWhitespace = 3 === c.firstChild.nodeType; da.tbody = !c.getElementsByTagName("tbody").length; da.htmlSerialize = !!c.getElementsByTagName("link").length; da.html5Clone = "<:nav></:nav>" !== ia.createElement("nav").cloneNode(!0).outerHTML; g.type = "checkbox"; g.checked = !0; b.appendChild(g); da.appendChecked = g.checked; c.innerHTML = "<textarea>x</textarea>"; da.noCloneChecked = !!c.cloneNode(!0).lastChild.defaultValue; b.appendChild(c); c.innerHTML = "<input type='radio' checked='checked' name='t'/>"; da.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
            da.noCloneEvent = !0; c.attachEvent && (c.attachEvent("onclick", function () { da.noCloneEvent = !1 }), c.cloneNode(!0).click()); if (null == da.deleteExpando) { da.deleteExpando = !0; try { delete c.test } catch (l) { da.deleteExpando = !1 } } b = c = g = null
        })(); (function () { var b, c = ia.createElement("div"); for (b in { submit: !0, change: !0, focusin: !0 }) { var g = "on" + b; (da[b + "Bubbles"] = g in d) || (c.setAttribute(g, "t"), da[b + "Bubbles"] = !1 === c.attributes[g].expando) } })(); var Jc = /^(?:input|select|textarea)$/i, Rc = /^key/, Rd = /^(?:mouse|contextmenu)|click/,
            Ud = /^(?:focusinfocus|focusoutblur)$/, yd = /^([^.]*)(?:\.(.+)|)$/; h.event = {
                global: {}, add: function (b, c, g, l, r) {
                    var t, v, C, I, K; if (v = h._data(b)) {
                        if (g.handler) { var Q = g; g = Q.handler; r = Q.selector } g.guid || (g.guid = h.guid++); (t = v.events) || (t = v.events = {}); (C = v.handle) || (C = v.handle = function (La) { return "undefined" === typeof h || La && h.event.triggered === La.type ? void 0 : h.event.dispatch.apply(C.elem, arguments) }, C.elem = b); c = (c || "").match(Kb) || [""]; for (v = c.length; v--;) {
                            var T = yd.exec(c[v]) || []; var X = I = T[1]; var xa = (T[2] || "").split(".").sort();
                            X && (T = h.event.special[X] || {}, X = (r ? T.delegateType : T.bindType) || X, T = h.event.special[X] || {}, I = h.extend({ type: X, origType: I, data: l, handler: g, guid: g.guid, selector: r, needsContext: r && h.expr.match.needsContext.test(r), namespace: xa.join(".") }, Q), (K = t[X]) || (K = t[X] = [], K.delegateCount = 0, T.setup && !1 !== T.setup.call(b, l, xa, C) || (b.addEventListener ? b.addEventListener(X, C, !1) : b.attachEvent && b.attachEvent("on" + X, C))), T.add && (T.add.call(b, I), I.handler.guid || (I.handler.guid = g.guid)), r ? K.splice(K.delegateCount++, 0, I) : K.push(I),
                                h.event.global[X] = !0)
                        } b = null
                    }
                }, remove: function (b, c, g, l, r) {
                    var t, v, C, I, K, Q = h.hasData(b) && h._data(b); if (Q && (I = Q.events)) {
                        c = (c || "").match(Kb) || [""]; for (C = c.length; C--;) {
                            var T = yd.exec(c[C]) || []; var X = K = T[1]; var xa = (T[2] || "").split(".").sort(); if (X) {
                                var La = h.event.special[X] || {}; X = (l ? La.delegateType : La.bindType) || X; var nb = I[X] || []; T = T[2] && new RegExp("(^|\\.)" + xa.join("\\.(?:.*\\.|)") + "(\\.|$)"); for (v = t = nb.length; t--;) {
                                    var Qa = nb[t]; !r && K !== Qa.origType || g && g.guid !== Qa.guid || T && !T.test(Qa.namespace) || l &&
                                        l !== Qa.selector && ("**" !== l || !Qa.selector) || (nb.splice(t, 1), Qa.selector && nb.delegateCount--, La.remove && La.remove.call(b, Qa))
                                } v && !nb.length && (La.teardown && !1 !== La.teardown.call(b, xa, Q.handle) || h.removeEvent(b, X, Q.handle), delete I[X])
                            } else for (X in I) h.event.remove(b, X + c[C], g, l, !0)
                        } h.isEmptyObject(I) && (delete Q.handle, h._removeData(b, "events"))
                    }
                }, trigger: function (b, c, g, l) {
                    var r, t, v = [g || ia], C = uc.call(b, "type") ? b.type : b; var I = uc.call(b, "namespace") ? b.namespace.split(".") : []; var K = r = g = g || ia; if (3 !== g.nodeType &&
                        8 !== g.nodeType && !Ud.test(C + h.event.triggered)) {
                            0 <= C.indexOf(".") && (I = C.split("."), C = I.shift(), I.sort()); var Q = 0 > C.indexOf(":") && "on" + C; b = b[h.expando] ? b : new h.Event(C, "object" === typeof b && b); b.isTrigger = l ? 2 : 3; b.namespace = I.join("."); b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + I.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; b.result = void 0; b.target || (b.target = g); c = null == c ? [b] : h.makeArray(c, [b]); I = h.event.special[C] || {}; if (l || !I.trigger || !1 !== I.trigger.apply(g, c)) {
                                if (!l && !I.noBubble && !h.isWindow(g)) {
                                    var T =
                                        I.delegateType || C; Ud.test(T + C) || (K = K.parentNode); for (; K; K = K.parentNode)v.push(K), r = K; r === (g.ownerDocument || ia) && v.push(r.defaultView || r.parentWindow || d)
                                } for (t = 0; (K = v[t++]) && !b.isPropagationStopped();)b.type = 1 < t ? T : I.bindType || C, (r = (h._data(K, "events") || {})[b.type] && h._data(K, "handle")) && r.apply(K, c), (r = Q && K[Q]) && r.apply && h.acceptData(K) && (b.result = r.apply(K, c), !1 === b.result && b.preventDefault()); b.type = C; if (!(l || b.isDefaultPrevented() || I._default && !1 !== I._default.apply(v.pop(), c)) && h.acceptData(g) &&
                                    Q && g[C] && !h.isWindow(g)) { (r = g[Q]) && (g[Q] = null); h.event.triggered = C; try { g[C]() } catch (X) { } h.event.triggered = void 0; r && (g[Q] = r) } return b.result
                            }
                    }
                }, dispatch: function (b) {
                    b = h.event.fix(b); var c, g, l, r = bc.call(arguments); var t = (h._data(this, "events") || {})[b.type] || []; var v = h.event.special[b.type] || {}; r[0] = b; b.delegateTarget = this; if (!v.preDispatch || !1 !== v.preDispatch.call(this, b)) {
                        var C = h.event.handlers.call(this, b, t); for (t = 0; (g = C[t++]) && !b.isPropagationStopped();)for (b.currentTarget = g.elem, l = 0; (c = g.handlers[l++]) &&
                            !b.isImmediatePropagationStopped();)if (!b.namespace_re || b.namespace_re.test(c.namespace)) b.handleObj = c, b.data = c.data, c = ((h.event.special[c.origType] || {}).handle || c.handler).apply(g.elem, r), void 0 !== c && !1 === (b.result = c) && (b.preventDefault(), b.stopPropagation()); v.postDispatch && v.postDispatch.call(this, b); return b.result
                    }
                }, handlers: function (b, c) {
                    var g, l = [], r = c.delegateCount, t = b.target; if (r && t.nodeType && (!b.button || "click" !== b.type)) for (; t != this; t = t.parentNode || this)if (1 === t.nodeType && (!0 !== t.disabled ||
                        "click" !== b.type)) { var v = []; for (g = 0; g < r; g++) { var C = c[g]; var I = C.selector + " "; void 0 === v[I] && (v[I] = C.needsContext ? 0 <= h(I, this).index(t) : h.find(I, this, null, [t]).length); v[I] && v.push(C) } v.length && l.push({ elem: t, handlers: v }) } r < c.length && l.push({ elem: this, handlers: c.slice(r) }); return l
                }, fix: function (b) {
                    if (b[h.expando]) return b; var c = b.type; var g = b, l = this.fixHooks[c]; l || (this.fixHooks[c] = l = Rd.test(c) ? this.mouseHooks : Rc.test(c) ? this.keyHooks : {}); var r = l.props ? this.props.concat(l.props) : this.props; b = new h.Event(g);
                    for (c = r.length; c--;) { var t = r[c]; b[t] = g[t] } b.target || (b.target = g.srcElement || ia); 3 === b.target.nodeType && (b.target = b.target.parentNode); b.metaKey = !!b.metaKey; return l.filter ? l.filter(b, g) : b
                }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: ["char", "charCode", "key", "keyCode"], filter: function (b, c) { null == b.which && (b.which = null != c.charCode ? c.charCode : c.keyCode); return b } }, mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (b, c) { var g = c.button, l = c.fromElement; if (null == b.pageX && null != c.clientX) { var r = b.target.ownerDocument || ia; var t = r.documentElement; r = r.body; b.pageX = c.clientX + (t && t.scrollLeft || r && r.scrollLeft || 0) - (t && t.clientLeft || r && r.clientLeft || 0); b.pageY = c.clientY + (t && t.scrollTop || r && r.scrollTop || 0) - (t && t.clientTop || r && r.clientTop || 0) } !b.relatedTarget && l && (b.relatedTarget = l === b.target ? c.toElement : l); b.which || void 0 === g || (b.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0); return b }
                }, special: {
                    load: { noBubble: !0 }, focus: {
                        trigger: function () {
                            if (this !==
                                L() && this.focus) try { return this.focus(), !1 } catch (b) { }
                        }, delegateType: "focusin"
                    }, blur: { trigger: function () { if (this === L() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function () { if (h.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1 }, _default: function (b) { return h.nodeName(b.target, "a") } }, beforeunload: { postDispatch: function (b) { void 0 !== b.result && (b.originalEvent.returnValue = b.result) } }
                }, simulate: function (b, c, g, l) {
                    b = h.extend(new h.Event, g, {
                        type: b,
                        isSimulated: !0, originalEvent: {}
                    }); l ? h.event.trigger(b, null, c) : h.event.dispatch.call(c, b); b.isDefaultPrevented() && g.preventDefault()
                }
            }; h.removeEvent = ia.removeEventListener ? function (b, c, g) { b.removeEventListener && b.removeEventListener(c, g, !1) } : function (b, c, g) { c = "on" + c; b.detachEvent && ("undefined" === typeof b[c] && (b[c] = null), b.detachEvent(c, g)) }; h.Event = function (b, c) {
                if (!(this instanceof h.Event)) return new h.Event(b, c); b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented ||
                    void 0 === b.defaultPrevented && (!1 === b.returnValue || b.getPreventDefault && b.getPreventDefault()) ? z : H) : this.type = b; c && h.extend(this, c); this.timeStamp = b && b.timeStamp || h.now(); this[h.expando] = !0
            }; h.Event.prototype = {
                isDefaultPrevented: H, isPropagationStopped: H, isImmediatePropagationStopped: H, preventDefault: function () { var b = this.originalEvent; this.isDefaultPrevented = z; b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1) }, stopPropagation: function () {
                    var b = this.originalEvent; this.isPropagationStopped = z;
                    b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
                }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = z; this.stopPropagation() }
            }; h.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (b, c) { h.event.special[b] = { delegateType: c, bindType: c, handle: function (g) { var l = g.relatedTarget, r = g.handleObj; if (!l || l !== this && !h.contains(this, l)) { g.type = r.origType; var t = r.handler.apply(this, arguments); g.type = c } return t } } }); da.submitBubbles || (h.event.special.submit = {
                setup: function () {
                    if (h.nodeName(this,
                        "form")) return !1; h.event.add(this, "click._submit keypress._submit", function (b) { b = b.target; (b = h.nodeName(b, "input") || h.nodeName(b, "button") ? b.form : void 0) && !h._data(b, "submitBubbles") && (h.event.add(b, "submit._submit", function (c) { c._submit_bubble = !0 }), h._data(b, "submitBubbles", !0)) })
                }, postDispatch: function (b) { b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && h.event.simulate("submit", this.parentNode, b, !0)) }, teardown: function () {
                    if (h.nodeName(this, "form")) return !1; h.event.remove(this,
                        "._submit")
                }
            }); da.changeBubbles || (h.event.special.change = {
                setup: function () {
                    if (Jc.test(this.nodeName)) { if ("checkbox" === this.type || "radio" === this.type) h.event.add(this, "propertychange._change", function (b) { "checked" === b.originalEvent.propertyName && (this._just_changed = !0) }), h.event.add(this, "click._change", function (b) { this._just_changed && !b.isTrigger && (this._just_changed = !1); h.event.simulate("change", this, b, !0) }); return !1 } h.event.add(this, "beforeactivate._change", function (b) {
                        b = b.target; Jc.test(b.nodeName) &&
                            !h._data(b, "changeBubbles") && (h.event.add(b, "change._change", function (c) { !this.parentNode || c.isSimulated || c.isTrigger || h.event.simulate("change", this.parentNode, c, !0) }), h._data(b, "changeBubbles", !0))
                    })
                }, handle: function (b) { var c = b.target; if (this !== c || b.isSimulated || b.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return b.handleObj.handler.apply(this, arguments) }, teardown: function () { h.event.remove(this, "._change"); return !Jc.test(this.nodeName) }
            }); da.focusinBubbles || h.each({ focus: "focusin", blur: "focusout" },
                function (b, c) { var g = function (l) { h.event.simulate(c, l.target, h.event.fix(l), !0) }; h.event.special[c] = { setup: function () { var l = this.ownerDocument || this, r = h._data(l, c); r || l.addEventListener(b, g, !0); h._data(l, c, (r || 0) + 1) }, teardown: function () { var l = this.ownerDocument || this, r = h._data(l, c) - 1; r ? h._data(l, c, r) : (l.removeEventListener(b, g, !0), h._removeData(l, c)) } } }); h.fn.extend({
                    on: function (b, c, g, l, r) {
                        var t; if ("object" === typeof b) { "string" !== typeof c && (g = g || c, c = void 0); for (t in b) this.on(t, c, g, b[t], r); return this } null ==
                            g && null == l ? (l = c, g = c = void 0) : null == l && ("string" === typeof c ? (l = g, g = void 0) : (l = g, g = c, c = void 0)); if (!1 === l) l = H; else if (!l) return this; if (1 === r) { var v = l; l = function (C) { h().off(C); return v.apply(this, arguments) }; l.guid = v.guid || (v.guid = h.guid++) } return this.each(function () { h.event.add(this, b, l, g, c) })
                    }, one: function (b, c, g, l) { return this.on(b, c, g, l, 1) }, off: function (b, c, g) {
                        if (b && b.preventDefault && b.handleObj) {
                            var l = b.handleObj; h(b.delegateTarget).off(l.namespace ? l.origType + "." + l.namespace : l.origType, l.selector,
                                l.handler); return this
                        } if ("object" === typeof b) { for (l in b) this.off(l, c, b[l]); return this } if (!1 === c || "function" === typeof c) g = c, c = void 0; !1 === g && (g = H); return this.each(function () { h.event.remove(this, b, g, c) })
                    }, trigger: function (b, c) { return this.each(function () { h.event.trigger(b, c, this) }) }, triggerHandler: function (b, c) { var g = this[0]; if (g) return h.event.trigger(b, c, g, !0) }
                }); var Pb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    ed = / jQuery\d+="(?:null|\d+)"/g, hc = new RegExp("<(?:" + Pb + ")[\\s/>]", "i"), Kc = /^\s+/, fd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Wd = /<([\w:]+)/, Uc = /<tbody/i, bd = /<|&#?\w+;/, fe = /<(?:script|style|link)/i, dc = /checked\s*(?:[^=]|=\s*.checked.)/i, xc = /^$|\/(?:java|ecma)script/i, yc = /^true\/(.*)/, me = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ib = {
                        option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>",
                            "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: da.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                    }, Ad = D(ia).appendChild(ia.createElement("div")); Ib.optgroup = Ib.option; Ib.tbody = Ib.tfoot = Ib.colgroup = Ib.caption = Ib.thead; Ib.th = Ib.td; h.extend({
                        clone: function (b, c, g) {
                            var l, r, t = h.contains(b.ownerDocument, b); if (da.html5Clone || h.isXMLDoc(b) || !hc.test("<" +
                                b.nodeName + ">")) var v = b.cloneNode(!0); else Ad.innerHTML = b.outerHTML, Ad.removeChild(v = Ad.firstChild); if (!(da.noCloneEvent && da.noCloneChecked || 1 !== b.nodeType && 11 !== b.nodeType || h.isXMLDoc(b))) {
                                    var C = M(v); var I = M(b); for (r = 0; null != (l = I[r]); ++r)if (C[r]) {
                                        var K = void 0, Q = l, T = C[r]; if (1 === T.nodeType) {
                                            var X = T.nodeName.toLowerCase(); if (!da.noCloneEvent && T[h.expando]) { l = h._data(T); for (K in l.events) h.removeEvent(T, K, l.handle); T.removeAttribute(h.expando) } if ("script" === X && T.text !== Q.text) aa(T).text = Q.text, fa(T);
                                            else if ("object" === X) T.parentNode && (T.outerHTML = Q.outerHTML), da.html5Clone && Q.innerHTML && !h.trim(T.innerHTML) && (T.innerHTML = Q.innerHTML); else if ("input" === X && Sc.test(Q.type)) T.defaultChecked = T.checked = Q.checked, T.value !== Q.value && (T.value = Q.value); else if ("option" === X) T.defaultSelected = T.selected = Q.defaultSelected; else if ("input" === X || "textarea" === X) T.defaultValue = Q.defaultValue
                                        }
                                    }
                                } if (c) if (g) for (I = I || M(b), C = C || M(v), r = 0; null != (l = I[r]); r++)Na(l, C[r]); else Na(b, v); C = M(v, "script"); 0 < C.length && ka(C, !t &&
                                    M(b, "script")); return v
                        }, buildFragment: function (b, c, g, l) {
                            for (var r, t, v, C, I, K, Q = b.length, T = D(c), X = [], xa = 0; xa < Q; xa++)if ((t = b[xa]) || 0 === t) if ("object" === h.type(t)) h.merge(X, t.nodeType ? [t] : t); else if (bd.test(t)) {
                                v = v || T.appendChild(c.createElement("div")); C = (Wd.exec(t) || ["", ""])[1].toLowerCase(); K = Ib[C] || Ib._default; v.innerHTML = K[1] + t.replace(fd, "<$1></$2>") + K[2]; for (r = K[0]; r--;)v = v.lastChild; !da.leadingWhitespace && Kc.test(t) && X.push(c.createTextNode(Kc.exec(t)[0])); if (!da.tbody) for (r = (t = "table" !== C || Uc.test(t) ?
                                    "<table>" !== K[1] || Uc.test(t) ? 0 : v : v.firstChild) && t.childNodes.length; r--;)h.nodeName(I = t.childNodes[r], "tbody") && !I.childNodes.length && t.removeChild(I); h.merge(X, v.childNodes); for (v.textContent = ""; v.firstChild;)v.removeChild(v.firstChild); v = T.lastChild
                            } else X.push(c.createTextNode(t)); v && T.removeChild(v); da.appendChecked || h.grep(M(X, "input"), N); for (xa = 0; t = X[xa++];)if (!l || -1 === h.inArray(t, l)) if (b = h.contains(t.ownerDocument, t), v = M(T.appendChild(t), "script"), b && ka(v), g) for (r = 0; t = v[r++];)xc.test(t.type ||
                                "") && g.push(t); return T
                        }, cleanData: function (b, c) { for (var g, l, r, t, v = 0, C = h.expando, I = h.cache, K = da.deleteExpando, Q = h.event.special; null != (g = b[v]); v++)if (c || h.acceptData(g)) if (t = (r = g[C]) && I[r]) { if (t.events) for (l in t.events) Q[l] ? h.event.remove(g, l) : h.removeEvent(g, l, t.handle); I[r] && (delete I[r], K ? delete g[C] : "undefined" !== typeof g.removeAttribute ? g.removeAttribute(C) : g[C] = null, Mb.push(r)) } }
                    }); h.fn.extend({
                        text: function (b) {
                            return Rb(this, function (c) {
                                return void 0 === c ? h.text(this) : this.empty().append((this[0] &&
                                    this[0].ownerDocument || ia).createTextNode(c))
                            }, null, b, arguments.length)
                        }, append: function () { return this.domManip(arguments, function (b) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Y(this, b).appendChild(b) }) }, prepend: function () { return this.domManip(arguments, function (b) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var c = Y(this, b); c.insertBefore(b, c.firstChild) } }) }, before: function () {
                            return this.domManip(arguments, function (b) {
                                this.parentNode && this.parentNode.insertBefore(b,
                                    this)
                            })
                        }, after: function () { return this.domManip(arguments, function (b) { this.parentNode && this.parentNode.insertBefore(b, this.nextSibling) }) }, remove: function (b, c) { for (var g, l = b ? h.filter(b, this) : this, r = 0; null != (g = l[r]); r++)c || 1 !== g.nodeType || h.cleanData(M(g)), g.parentNode && (c && h.contains(g.ownerDocument, g) && ka(M(g, "script")), g.parentNode.removeChild(g)); return this }, empty: function () {
                            for (var b, c = 0; null != (b = this[c]); c++) {
                                for (1 === b.nodeType && h.cleanData(M(b, !1)); b.firstChild;)b.removeChild(b.firstChild);
                                b.options && h.nodeName(b, "select") && (b.options.length = 0)
                            } return this
                        }, clone: function (b, c) { b = null == b ? !1 : b; c = null == c ? b : c; return this.map(function () { return h.clone(this, b, c) }) }, html: function (b) {
                            return Rb(this, function (c) {
                                var g = this[0] || {}, l = 0, r = this.length; if (void 0 === c) return 1 === g.nodeType ? g.innerHTML.replace(ed, "") : void 0; if (!("string" !== typeof c || fe.test(c) || !da.htmlSerialize && hc.test(c) || !da.leadingWhitespace && Kc.test(c) || Ib[(Wd.exec(c) || ["", ""])[1].toLowerCase()])) {
                                    c = c.replace(fd, "<$1></$2>"); try {
                                        for (; l <
                                            r; l++)g = this[l] || {}, 1 === g.nodeType && (h.cleanData(M(g, !1)), g.innerHTML = c); g = 0
                                    } catch (t) { }
                                } g && this.empty().append(c)
                            }, null, b, arguments.length)
                        }, replaceWith: function () { var b = arguments[0]; this.domManip(arguments, function (c) { b = this.parentNode; h.cleanData(M(this)); b && b.replaceChild(c, this) }); return b && (b.length || b.nodeType) ? this : this.remove() }, detach: function (b) { return this.remove(b, !0) }, domManip: function (b, c) {
                            b = kc.apply([], b); var g, l = 0, r = this.length, t = this, v = r - 1, C = b[0], I = h.isFunction(C); if (I || 1 < r && "string" ===
                                typeof C && !da.checkClone && dc.test(C)) return this.each(function (X) { var xa = t.eq(X); I && (b[0] = C.call(this, X, xa.html())); xa.domManip(b, c) }); if (r) {
                                    var K = h.buildFragment(b, this[0].ownerDocument, !1, this); var Q = K.firstChild; 1 === K.childNodes.length && (K = Q); if (Q) {
                                        var T = h.map(M(K, "script"), aa); for (g = T.length; l < r; l++)Q = K, l !== v && (Q = h.clone(Q, !0, !0), g && h.merge(T, M(Q, "script"))), c.call(this[l], Q, l); if (g) for (K = T[T.length - 1].ownerDocument, h.map(T, fa), l = 0; l < g; l++)Q = T[l], xc.test(Q.type || "") && !h._data(Q, "globalEval") &&
                                            h.contains(K, Q) && (Q.src ? h._evalUrl && h._evalUrl(Q.src) : h.globalEval((Q.text || Q.textContent || Q.innerHTML || "").replace(me, ""))); K = Q = null
                                    }
                                } return this
                        }
                    }); h.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (b, c) { h.fn[b] = function (g) { for (var l = 0, r = [], t = h(g), v = t.length - 1; l <= v; l++)g = l === v ? this : this.clone(!0), h(t[l])[c](g), od.apply(r, g.get()); return this.pushStack(r) } }); var sc, sd = {}; (function () {
                        var b, c = ia.createElement("div"); c.innerHTML =
                            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; var g = c.getElementsByTagName("a")[0]; g.style.cssText = "float:left;opacity:.5"; da.opacity = /^0.5/.test(g.style.opacity); da.cssFloat = !!g.style.cssFloat; c.style.backgroundClip = "content-box"; c.cloneNode(!0).style.backgroundClip = ""; da.clearCloneStyle = "content-box" === c.style.backgroundClip; g = c = null; da.shrinkWrapBlocks = function () {
                                if (null == b) {
                                    var l = ia.getElementsByTagName("body")[0]; if (!l) return; var r = ia.createElement("div"); var t = ia.createElement("div");
                                    l.appendChild(r).appendChild(t); b = !1; "undefined" !== typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0;width:1px;padding:1px;zoom:1", t.innerHTML = "<div></div>", t.firstChild.style.width = "5px", b = 3 !== t.offsetWidth); l.removeChild(r)
                                } return b
                            }
                    })(); var Sd = /^margin/, Wc = new RegExp("^(" + Dc + ")(?!px)[a-z%]+$", "i"), wb = /^(top|right|bottom|left)$/; if (d.getComputedStyle) {
                        var Za = function (b) {
                            return b.ownerDocument.defaultView.getComputedStyle(b,
                                null)
                        }; var zb = function (b, c, g) { var l = b.style; var r = (g = g || Za(b)) ? g.getPropertyValue(c) || g[c] : void 0; if (g && ("" !== r || h.contains(b.ownerDocument, b) || (r = h.style(b, c)), Wc.test(r) && Sd.test(c))) { b = l.width; c = l.minWidth; var t = l.maxWidth; l.minWidth = l.maxWidth = l.width = r; r = g.width; l.width = b; l.minWidth = c; l.maxWidth = t } return void 0 === r ? r : r + "" }
                    } else ia.documentElement.currentStyle && (Za = function (b) { return b.currentStyle }, zb = function (b, c, g) {
                        var l, r, t = b.style; var v = (g = g || Za(b)) ? g[c] : void 0; null == v && t && t[c] && (v = t[c]);
                        if (Wc.test(v) && !wb.test(c)) { g = t.left; if (r = (l = b.runtimeStyle) && l.left) l.left = b.currentStyle.left; t.left = "fontSize" === c ? "1em" : v; v = t.pixelLeft + "px"; t.left = g; r && (l.left = r) } return void 0 === v ? v : v + "" || "auto"
                    }); (function () {
                        function b() {
                            var I = ia.getElementsByTagName("body")[0]; if (I) {
                                var K = ia.createElement("div"); var Q = ia.createElement("div"); K.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px"; I.appendChild(K).appendChild(Q); Q.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%";
                                h.swap(I, null != I.style.zoom ? { zoom: 1 } : {}, function () { g = 4 === Q.offsetWidth }); l = !0; r = !1; t = !0; d.getComputedStyle && (r = "1%" !== (d.getComputedStyle(Q, null) || {}).top, l = "4px" === (d.getComputedStyle(Q, null) || { width: "4px" }).width); I.removeChild(K); Q = I = null
                            }
                        } var c, g, l, r, t, v = ia.createElement("div"); v.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; var C = v.getElementsByTagName("a")[0]; C.style.cssText = "float:left;opacity:.5"; da.opacity = /^0.5/.test(C.style.opacity); da.cssFloat = !!C.style.cssFloat;
                        v.style.backgroundClip = "content-box"; v.cloneNode(!0).style.backgroundClip = ""; da.clearCloneStyle = "content-box" === v.style.backgroundClip; C = v = null; h.extend(da, {
                            reliableHiddenOffsets: function () {
                                if (null != c) return c; var I = ia.createElement("div"); var K = ia.getElementsByTagName("body")[0]; if (K) {
                                    I.setAttribute("className", "t"); I.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; var Q = ia.createElement("div"); Q.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
                                    K.appendChild(Q).appendChild(I); I.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"; I = I.getElementsByTagName("td"); I[0].style.cssText = "padding:0;margin:0;border:0;display:none"; var T = 0 === I[0].offsetHeight; I[0].style.display = ""; I[1].style.display = "none"; c = T && 0 === I[0].offsetHeight; K.removeChild(Q); return c
                                }
                            }, boxSizing: function () { null == g && b(); return g }, boxSizingReliable: function () { null == l && b(); return l }, pixelPosition: function () { null == r && b(); return r }, reliableMarginRight: function () {
                                if (null == t &&
                                    d.getComputedStyle) {
                                        var I = ia.getElementsByTagName("body")[0]; if (!I) return; var K = ia.createElement("div"); var Q = ia.createElement("div"); K.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px"; I.appendChild(K).appendChild(Q); var T = Q.appendChild(ia.createElement("div")); T.style.cssText = Q.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0"; T.style.marginRight = T.style.width = "0"; Q.style.width =
                                            "1px"; t = !parseFloat((d.getComputedStyle(T, null) || {}).marginRight); I.removeChild(K)
                                } return t
                            }
                        })
                    })(); h.swap = function (b, c, g, l) { var r, t = {}; for (r in c) t[r] = b.style[r], b.style[r] = c[r]; g = g.apply(b, l || []); for (r in c) b.style[r] = t[r]; return g }; var Ba = /alpha\([^)]*\)/i, ub = /opacity\s*=\s*([^)]*)/, oe = /^(none|table(?!-c[ea]).+)/, id = new RegExp("^(" + Dc + ")(.*)$", "i"), pe = new RegExp("^([+-])=(" + Dc + ")", "i"), Bd = { position: "absolute", visibility: "hidden", display: "block" }, zc = { letterSpacing: 0, fontWeight: 400 }, Xd = ["Webkit",
                        "O", "Moz", "ms"]; h.extend({
                            cssHooks: { opacity: { get: function (b, c) { if (c) { var g = zb(b, "opacity"); return "" === g ? "1" : g } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": da.cssFloat ? "cssFloat" : "styleFloat" }, style: function (b, c, g, l) {
                                if (b && 3 !== b.nodeType && 8 !== b.nodeType && b.style) {
                                    var r, t = h.camelCase(c), v = b.style; c = h.cssProps[t] || (h.cssProps[t] = Fa(v, t)); var C = h.cssHooks[c] || h.cssHooks[t]; if (void 0 !== g) {
                                        var I = typeof g;
                                        "string" === I && (r = pe.exec(g)) && (g = (r[1] + 1) * r[2] + parseFloat(h.css(b, c)), I = "number"); if (null != g && g === g && ("number" !== I || h.cssNumber[t] || (g += "px"), da.clearCloneStyle || "" !== g || 0 !== c.indexOf("background") || (v[c] = "inherit"), !(C && "set" in C) || void 0 !== (g = C.set(b, g, l)))) try { v[c] = "", v[c] = g } catch (K) { }
                                    } else return C && "get" in C && void 0 !== (r = C.get(b, !1, l)) ? r : v[c]
                                }
                            }, css: function (b, c, g, l) {
                                var r; var t = h.camelCase(c); c = h.cssProps[t] || (h.cssProps[t] = Fa(b.style, t)); (t = h.cssHooks[c] || h.cssHooks[t]) && "get" in t && (r = t.get(b,
                                    !0, g)); void 0 === r && (r = zb(b, c, l)); "normal" === r && c in zc && (r = zc[c]); return "" === g || g ? (b = parseFloat(r), !0 === g || h.isNumeric(b) ? b || 0 : r) : r
                            }
                        }); h.each(["height", "width"], function (b, c) { h.cssHooks[c] = { get: function (g, l, r) { if (l) return 0 === g.offsetWidth && oe.test(h.css(g, "display")) ? h.swap(g, Bd, function () { return G(g, c, r) }) : G(g, c, r) }, set: function (g, l, r) { var t = r && Za(g); return Da(g, l, r ? Wa(g, c, r, da.boxSizing() && "border-box" === h.css(g, "boxSizing", !1, t), t) : 0) } } }); da.opacity || (h.cssHooks.opacity = {
                            get: function (b, c) {
                                return ub.test((c &&
                                    b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
                            }, set: function (b, c) { var g = b.style, l = b.currentStyle, r = h.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "", t = l && l.filter || g.filter || ""; g.zoom = 1; if ((1 <= c || "" === c) && "" === h.trim(t.replace(Ba, "")) && g.removeAttribute && (g.removeAttribute("filter"), "" === c || l && !l.filter)) return; g.filter = Ba.test(t) ? t.replace(Ba, r) : t + " " + r }
                        }); h.cssHooks.marginRight = V(da.reliableMarginRight, function (b, c) {
                            if (c) return h.swap(b, { display: "inline-block" },
                                zb, [b, "marginRight"])
                        }); h.each({ margin: "", padding: "", border: "Width" }, function (b, c) { h.cssHooks[b + c] = { expand: function (g) { var l = 0, r = {}; for (g = "string" === typeof g ? g.split(" ") : [g]; 4 > l; l++)r[b + Zb[l] + c] = g[l] || g[l - 2] || g[0]; return r } }; Sd.test(b) || (h.cssHooks[b + c].set = Da) }); h.fn.extend({
                            css: function (b, c) { return Rb(this, function (g, l, r) { var t, v = {}, C = 0; if (h.isArray(l)) { r = Za(g); for (t = l.length; C < t; C++)v[l[C]] = h.css(g, l[C], !1, r); return v } return void 0 !== r ? h.style(g, l, r) : h.css(g, l) }, b, c, 1 < arguments.length) }, show: function () {
                                return ea(this,
                                    !0)
                            }, hide: function () { return ea(this) }, toggle: function (b) { return "boolean" === typeof b ? b ? this.show() : this.hide() : this.each(function () { Gc(this) ? h(this).show() : h(this).hide() }) }
                        }); h.Tween = U; U.prototype = {
                            constructor: U, init: function (b, c, g, l, r, t) { this.elem = b; this.prop = g; this.easing = r || "swing"; this.options = c; this.start = this.now = this.cur(); this.end = l; this.unit = t || (h.cssNumber[g] ? "" : "px") }, cur: function () { var b = U.propHooks[this.prop]; return b && b.get ? b.get(this) : U.propHooks._default.get(this) }, run: function (b) {
                                var c,
                                g = U.propHooks[this.prop]; this.pos = this.options.duration ? c = h.easing[this.easing](b, this.options.duration * b, 0, 1, this.options.duration) : c = b; this.now = (this.end - this.start) * c + this.start; this.options.step && this.options.step.call(this.elem, this.now, this); g && g.set ? g.set(this) : U.propHooks._default.set(this); return this
                            }
                        }; U.prototype.init.prototype = U.prototype; U.propHooks = {
                            _default: {
                                get: function (b) {
                                    return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (b = h.css(b.elem, b.prop, "")) && "auto" !== b ?
                                        b : 0 : b.elem[b.prop]
                                }, set: function (b) { if (h.fx.step[b.prop]) h.fx.step[b.prop](b); else b.elem.style && (null != b.elem.style[h.cssProps[b.prop]] || h.cssHooks[b.prop]) ? h.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now }
                            }
                        }; U.propHooks.scrollTop = U.propHooks.scrollLeft = { set: function (b) { b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now) } }; h.easing = { linear: function (b) { return b }, swing: function (b) { return .5 - Math.cos(b * Math.PI) / 2 } }; h.fx = U.prototype.init; h.fx.step = {}; var Tb, jc, tc = /^(?:toggle|show|hide)$/,
                            Yd = new RegExp("^(?:([+-])=|)(" + Dc + ")([a-z%]*)$", "i"), Ic = /queueHooks$/, rc = [function (b, c, g) {
                                var l, r = this, t = {}, v = b.style, C = b.nodeType && Gc(b), I = h._data(b, "fxshow"); if (!g.queue) { var K = h._queueHooks(b, "fx"); if (null == K.unqueued) { K.unqueued = 0; var Q = K.empty.fire; K.empty.fire = function () { K.unqueued || Q() } } K.unqueued++; r.always(function () { r.always(function () { K.unqueued--; h.queue(b, "fx").length || K.empty.fire() }) }) } if (1 === b.nodeType && ("height" in c || "width" in c)) {
                                    g.overflow = [v.overflow, v.overflowX, v.overflowY]; var T =
                                        h.css(b, "display"); var X = ua(b.nodeName); "none" === T && (T = X); "inline" === T && "none" === h.css(b, "float") && (da.inlineBlockNeedsLayout && "inline" !== X ? v.zoom = 1 : v.display = "inline-block")
                                } g.overflow && (v.overflow = "hidden", da.shrinkWrapBlocks() || r.always(function () { v.overflow = g.overflow[0]; v.overflowX = g.overflow[1]; v.overflowY = g.overflow[2] })); for (l in c) if (T = c[l], tc.exec(T)) { delete c[l]; var xa = xa || "toggle" === T; if (T === (C ? "hide" : "show")) if ("show" === T && I && void 0 !== I[l]) C = !0; else continue; t[l] = I && I[l] || h.style(b, l) } if (!h.isEmptyObject(t)) for (l in I ?
                                    "hidden" in I && (C = I.hidden) : I = h._data(b, "fxshow", {}), xa && (I.hidden = !C), C ? h(b).show() : r.done(function () { h(b).hide() }), r.done(function () { var La; h._removeData(b, "fxshow"); for (La in t) h.style(b, La, t[La]) }), t) c = Ca(C ? I[l] : 0, l, r), l in I || (I[l] = c.start, C && (c.end = c.start, c.start = "width" === l || "height" === l ? 1 : 0))
                            }], jd = {
                                "*": [function (b, c) {
                                    var g = this.createTween(b, c), l = g.cur(), r = Yd.exec(c), t = r && r[3] || (h.cssNumber[b] ? "" : "px"), v = (h.cssNumber[b] || "px" !== t && +l) && Yd.exec(h.css(g.elem, b)), C = 1, I = 20; if (v && v[3] !== t) {
                                        t = t ||
                                        v[3]; r = r || []; v = +l || 1; do C = C || ".5", v /= C, h.style(g.elem, b, v + t); while (C !== (C = g.cur() / l) && 1 !== C && --I)
                                    } r && (v = g.start = +v || +l || 0, g.unit = t, g.end = r[1] ? v + (r[1] + 1) * r[2] : +r[2]); return g
                                }]
                            }; h.Animation = h.extend(rb, { tweener: function (b, c) { h.isFunction(b) ? (c = b, b = ["*"]) : b = b.split(" "); for (var g, l = 0, r = b.length; l < r; l++)g = b[l], jd[g] = jd[g] || [], jd[g].unshift(c) }, prefilter: function (b, c) { c ? rc.unshift(b) : rc.push(b) } }); h.speed = function (b, c, g) {
                                var l = b && "object" === typeof b ? h.extend({}, b) : {
                                    complete: g || !g && c || h.isFunction(b) &&
                                        b, duration: b, easing: g && c || c && !h.isFunction(c) && c
                                }; l.duration = h.fx.off ? 0 : "number" === typeof l.duration ? l.duration : l.duration in h.fx.speeds ? h.fx.speeds[l.duration] : h.fx.speeds._default; if (null == l.queue || !0 === l.queue) l.queue = "fx"; l.old = l.complete; l.complete = function () { h.isFunction(l.old) && l.old.call(this); l.queue && h.dequeue(this, l.queue) }; return l
                            }; h.fn.extend({
                                fadeTo: function (b, c, g, l) { return this.filter(Gc).css("opacity", 0).show().end().animate({ opacity: c }, b, g, l) }, animate: function (b, c, g, l) {
                                    var r = h.isEmptyObject(b),
                                    t = h.speed(c, g, l); c = function () { var v = rb(this, h.extend({}, b), t); (r || h._data(this, "finish")) && v.stop(!0) }; c.finish = c; return r || !1 === t.queue ? this.each(c) : this.queue(t.queue, c)
                                }, stop: function (b, c, g) {
                                    var l = function (r) { var t = r.stop; delete r.stop; t(g) }; "string" !== typeof b && (g = c, c = b, b = void 0); c && !1 !== b && this.queue(b || "fx", []); return this.each(function () {
                                        var r = !0, t = null != b && b + "queueHooks", v = h.timers, C = h._data(this); if (t) C[t] && C[t].stop && l(C[t]); else for (t in C) C[t] && C[t].stop && Ic.test(t) && l(C[t]); for (t = v.length; t--;)v[t].elem !==
                                            this || null != b && v[t].queue !== b || (v[t].anim.stop(g), r = !1, v.splice(t, 1)); !r && g || h.dequeue(this, b)
                                    })
                                }, finish: function (b) { !1 !== b && (b = b || "fx"); return this.each(function () { var c = h._data(this), g = c[b + "queue"]; var l = c[b + "queueHooks"]; var r = h.timers, t = g ? g.length : 0; c.finish = !0; h.queue(this, b, []); l && l.stop && l.stop.call(this, !0); for (l = r.length; l--;)r[l].elem === this && r[l].queue === b && (r[l].anim.stop(!0), r.splice(l, 1)); for (l = 0; l < t; l++)g[l] && g[l].finish && g[l].finish.call(this); delete c.finish }) }
                            }); h.each(["toggle",
                                "show", "hide"], function (b, c) { var g = h.fn[c]; h.fn[c] = function (l, r, t) { return null == l || "boolean" === typeof l ? g.apply(this, arguments) : this.animate(qa(c, !0), l, r, t) } }); h.each({ slideDown: qa("show"), slideUp: qa("hide"), slideToggle: qa("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (b, c) { h.fn[b] = function (g, l, r) { return this.animate(c, g, l, r) } }); h.timers = []; h.fx.tick = function () {
                                    var b = h.timers, c = 0; for (Tb = h.now(); c < b.length; c++) {
                                        var g = b[c]; g() || b[c] !== g || b.splice(c--,
                                            1)
                                    } b.length || h.fx.stop(); Tb = void 0
                                }; h.fx.timer = function (b) { h.timers.push(b); b() ? h.fx.start() : h.timers.pop() }; h.fx.interval = 13; h.fx.start = function () { jc || (jc = setInterval(h.fx.tick, h.fx.interval)) }; h.fx.stop = function () { clearInterval(jc); jc = null }; h.fx.speeds = { slow: 600, fast: 200, _default: 400 }; h.fn.delay = function (b, c) { b = h.fx ? h.fx.speeds[b] || b : b; return this.queue(c || "fx", function (g, l) { var r = setTimeout(g, b); l.stop = function () { clearTimeout(r) } }) }; (function () {
                                    var b = ia.createElement("div"); b.setAttribute("className",
                                        "t"); b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; var c = b.getElementsByTagName("a")[0]; var g = ia.createElement("select"); var l = g.appendChild(ia.createElement("option")); var r = b.getElementsByTagName("input")[0]; c.style.cssText = "top:1px"; da.getSetAttribute = "t" !== b.className; da.style = /top/.test(c.getAttribute("style")); da.hrefNormalized = "/a" === c.getAttribute("href"); da.checkOn = !!r.value; da.optSelected = l.selected; da.enctype = !!ia.createElement("form").enctype; g.disabled =
                                            !0; da.optDisabled = !l.disabled; r = ia.createElement("input"); r.setAttribute("value", ""); da.input = "" === r.getAttribute("value"); r.value = "t"; r.setAttribute("type", "radio"); da.radioValue = "t" === r.value
                                })(); var eb = /\r/g; h.fn.extend({
                                    val: function (b) {
                                        var c, g, l = this[0]; if (arguments.length) {
                                            var r = h.isFunction(b); return this.each(function (t) {
                                                1 === this.nodeType && (t = r ? b.call(this, t, h(this).val()) : b, null == t ? t = "" : "number" === typeof t ? t += "" : h.isArray(t) && (t = h.map(t, function (v) { return null == v ? "" : v + "" })), c = h.valHooks[this.type] ||
                                                    h.valHooks[this.nodeName.toLowerCase()], c && "set" in c && void 0 !== c.set(this, t, "value") || (this.value = t))
                                            })
                                        } if (l) { if ((c = h.valHooks[l.type] || h.valHooks[l.nodeName.toLowerCase()]) && "get" in c && void 0 !== (g = c.get(l, "value"))) return g; g = l.value; return "string" === typeof g ? g.replace(eb, "") : null == g ? "" : g }
                                    }
                                }); h.extend({
                                    valHooks: {
                                        option: { get: function (b) { var c = h.find.attr(b, "value"); return null != c ? c : h.text(b) } }, select: {
                                            get: function (b) {
                                                for (var c, g = b.options, l = b.selectedIndex, r = (b = "select-one" === b.type || 0 > l) ? null : [],
                                                    t = b ? l + 1 : g.length, v = 0 > l ? t : b ? l : 0; v < t; v++)if (c = g[v], !(!c.selected && v !== l || (da.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && h.nodeName(c.parentNode, "optgroup"))) { c = h(c).val(); if (b) return c; r.push(c) } return r
                                            }, set: function (b, c) { for (var g, l, r = b.options, t = h.makeArray(c), v = r.length; v--;)if (l = r[v], 0 <= h.inArray(h.valHooks.option.get(l), t)) try { l.selected = g = !0 } catch (C) { l.scrollHeight } else l.selected = !1; g || (b.selectedIndex = -1); return r }
                                        }
                                    }
                                }); h.each(["radio", "checkbox"], function () {
                                    h.valHooks[this] =
                                    { set: function (b, c) { if (h.isArray(c)) return b.checked = 0 <= h.inArray(h(b).val(), c) } }; da.checkOn || (h.valHooks[this].get = function (b) { return null === b.getAttribute("value") ? "on" : b.value })
                                }); var Sb = h.expr.attrHandle, Bc = /^(?:checked|selected)$/i, gc = da.getSetAttribute, Vb = da.input; h.fn.extend({ attr: function (b, c) { return Rb(this, h.attr, b, c, 1 < arguments.length) }, removeAttr: function (b) { return this.each(function () { h.removeAttr(this, b) }) } }); h.extend({
                                    attr: function (b, c, g) {
                                        var l, r = b.nodeType; if (b && 3 !== r && 8 !== r && 2 !== r) {
                                            if ("undefined" ===
                                                typeof b.getAttribute) return h.prop(b, c, g); if (1 !== r || !h.isXMLDoc(b)) { c = c.toLowerCase(); var t = h.attrHooks[c] || (h.expr.match.bool.test(c) ? qe : Mc) } if (void 0 !== g) if (null === g) h.removeAttr(b, c); else { if (t && "set" in t && void 0 !== (l = t.set(b, g, c))) return l; b.setAttribute(c, g + ""); return g } else { if (t && "get" in t && null !== (l = t.get(b, c))) return l; l = h.find.attr(b, c); return null == l ? void 0 : l }
                                        }
                                    }, removeAttr: function (b, c) {
                                        var g, l = 0, r = c && c.match(Kb); if (r && 1 === b.nodeType) for (; g = r[l++];) {
                                            var t = h.propFix[g] || g; h.expr.match.bool.test(g) ?
                                                Vb && gc || !Bc.test(g) ? b[t] = !1 : b[h.camelCase("default-" + g)] = b[t] = !1 : h.attr(b, g, ""); b.removeAttribute(gc ? g : t)
                                        }
                                    }, attrHooks: { type: { set: function (b, c) { if (!da.radioValue && "radio" === c && h.nodeName(b, "input")) { var g = b.value; b.setAttribute("type", c); g && (b.value = g); return c } } } }
                                }); var qe = { set: function (b, c, g) { !1 === c ? h.removeAttr(b, g) : Vb && gc || !Bc.test(g) ? b.setAttribute(!gc && h.propFix[g] || g, g) : b[h.camelCase("default-" + g)] = b[g] = !0; return g } }; h.each(h.expr.match.bool.source.match(/\w+/g), function (b, c) {
                                    var g = Sb[c] || h.find.attr;
                                    Sb[c] = Vb && gc || !Bc.test(c) ? function (l, r, t) { if (!t) { var v = Sb[r]; Sb[r] = C; var C = null != g(l, r, t) ? r.toLowerCase() : null; Sb[r] = v } return C } : function (l, r, t) { if (!t) return l[h.camelCase("default-" + r)] ? r.toLowerCase() : null }
                                }); Vb && gc || (h.attrHooks.value = { set: function (b, c, g) { if (h.nodeName(b, "input")) b.defaultValue = c; else return Mc && Mc.set(b, c, g) } }); if (!gc) {
                                    var Mc = { set: function (b, c, g) { var l = b.getAttributeNode(g); l || b.setAttributeNode(l = b.ownerDocument.createAttribute(g)); l.value = c += ""; if ("value" === g || c === b.getAttribute(g)) return c } };
                                    Sb.id = Sb.name = Sb.coords = function (b, c, g) { var l; if (!g) return (l = b.getAttributeNode(c)) && "" !== l.value ? l.value : null }; h.valHooks.button = { get: function (b, c) { var g = b.getAttributeNode(c); if (g && g.specified) return g.value }, set: Mc.set }; h.attrHooks.contenteditable = { set: function (b, c, g) { Mc.set(b, "" === c ? !1 : c, g) } }; h.each(["width", "height"], function (b, c) { h.attrHooks[c] = { set: function (g, l) { if ("" === l) return g.setAttribute(c, "auto"), l } } })
                                } da.style || (h.attrHooks.style = {
                                    get: function (b) { return b.style.cssText || void 0 }, set: function (b,
                                        c) { return b.style.cssText = c + "" }
                                }); var Zd = /^(?:input|select|textarea|button|object)$/i, re = /^(?:a|area)$/i; h.fn.extend({ prop: function (b, c) { return Rb(this, h.prop, b, c, 1 < arguments.length) }, removeProp: function (b) { b = h.propFix[b] || b; return this.each(function () { try { this[b] = void 0, delete this[b] } catch (c) { } }) } }); h.extend({
                                    propFix: { "for": "htmlFor", "class": "className" }, prop: function (b, c, g) {
                                        var l, r = b.nodeType; if (b && 3 !== r && 8 !== r && 2 !== r) {
                                            if (1 !== r || !h.isXMLDoc(b)) { c = h.propFix[c] || c; var t = h.propHooks[c] } return void 0 !==
                                                g ? t && "set" in t && void 0 !== (l = t.set(b, g, c)) ? l : b[c] = g : t && "get" in t && null !== (l = t.get(b, c)) ? l : b[c]
                                        }
                                    }, propHooks: { tabIndex: { get: function (b) { var c = h.find.attr(b, "tabindex"); return c ? parseInt(c, 10) : Zd.test(b.nodeName) || re.test(b.nodeName) && b.href ? 0 : -1 } } }
                                }); da.hrefNormalized || h.each(["href", "src"], function (b, c) { h.propHooks[c] = { get: function (g) { return g.getAttribute(c, 4) } } }); da.optSelected || (h.propHooks.selected = { get: function (b) { if (b = b.parentNode) b.selectedIndex, b.parentNode && b.parentNode.selectedIndex; return null } });
    h.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function () { h.propFix[this.toLowerCase()] = this }); da.enctype || (h.propFix.enctype = "encoding"); var Ta = /[\t\r\n\f]/g; h.fn.extend({
        addClass: function (b) {
            var c, g, l, r = 0, t = this.length; var v = "string" === typeof b && b; if (h.isFunction(b)) return this.each(function (I) { h(this).addClass(b.call(this, I, this.className)) }); if (v) for (v = (b || "").match(Kb) || []; r < t; r++) {
                var C = this[r]; if (c = 1 === C.nodeType &&
                    (C.className ? (" " + C.className + " ").replace(Ta, " ") : " ")) { for (l = 0; g = v[l++];)0 > c.indexOf(" " + g + " ") && (c += g + " "); c = h.trim(c); C.className !== c && (C.className = c) }
            } return this
        }, removeClass: function (b) {
            var c, g, l, r = 0, t = this.length; var v = 0 === arguments.length || "string" === typeof b && b; if (h.isFunction(b)) return this.each(function (I) { h(this).removeClass(b.call(this, I, this.className)) }); if (v) for (v = (b || "").match(Kb) || []; r < t; r++) {
                var C = this[r]; if (c = 1 === C.nodeType && (C.className ? (" " + C.className + " ").replace(Ta, " ") :
                    "")) { for (l = 0; g = v[l++];)for (; 0 <= c.indexOf(" " + g + " ");)c = c.replace(" " + g + " ", " "); c = b ? h.trim(c) : ""; C.className !== c && (C.className = c) }
            } return this
        }, toggleClass: function (b, c) {
            var g = typeof b; return "boolean" === typeof c && "string" === g ? c ? this.addClass(b) : this.removeClass(b) : h.isFunction(b) ? this.each(function (l) { h(this).toggleClass(b.call(this, l, this.className, c), c) }) : this.each(function () {
                if ("string" === g) for (var l, r = 0, t = h(this), v = b.match(Kb) || []; l = v[r++];)t.hasClass(l) ? t.removeClass(l) : t.addClass(l); else if ("undefined" ===
                    g || "boolean" === g) this.className && h._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : h._data(this, "__className__") || ""
            })
        }, hasClass: function (b) { b = " " + b + " "; for (var c = 0, g = this.length; c < g; c++)if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(Ta, " ").indexOf(b)) return !0; return !1 }
    }); h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function (b, c) { h.fn[c] = function (g, l) { return 0 < arguments.length ? this.on(c, null, g, l) : this.trigger(c) } }); h.fn.extend({ hover: function (b, c) { return this.mouseenter(b).mouseleave(c || b) }, bind: function (b, c, g) { return this.on(b, null, c, g) }, unbind: function (b, c) { return this.off(b, null, c) }, delegate: function (b, c, g, l) { return this.on(c, b, g, l) }, undelegate: function (b, c, g) { return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", g) } }); var lc = h.now(), na = /\?/, $d = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    h.parseJSON = function (b) { if (d.JSON && d.JSON.parse) return d.JSON.parse(b + ""); var c, g = null, l = h.trim(b + ""); return l && !h.trim(l.replace($d, function (r, t, v, C) { c && t && (g = 0); if (0 === g) return r; c = v || t; g += !C - !v; return "" })) ? Function("return " + l)() : h.error("Invalid JSON: " + b) }; h.parseXML = function (b) {
        if (!b || "string" !== typeof b) return null; try { if (d.DOMParser) { var c = new DOMParser; var g = c.parseFromString(b, "text/xml") } else g = new ActiveXObject("Microsoft.XMLDOM"), g.async = "false", g.loadXML(b) } catch (l) { g = void 0 } g && g.documentElement &&
            !g.getElementsByTagName("parsererror").length || h.error("Invalid XML: " + b); return g
    }; var ae = /#.*$/, Nc = /([?&])_=[^&]*/, qc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, xd = /^(?:GET|HEAD)$/, Vd = /^\/\//, Qb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Lb = {}, wc = {}, Oa = "*/".concat("*"); try { var ib = location.href } catch (b) { ib = ia.createElement("a"), ib.href = "", ib = ib.href } var lb = Qb.exec(ib.toLowerCase()) || []; h.extend({
        active: 0, lastModified: {}, etag: {}, ajaxSettings: {
            url: ib, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(lb[1]),
            global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Oa, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": h.parseJSON, "text xml": h.parseXML }, flatOptions: { url: !0, context: !0 }
        }, ajaxSetup: function (b, c) {
            return c ? ra(ra(b,
                h.ajaxSettings), c) : ra(h.ajaxSettings, b)
        }, ajaxPrefilter: yb(Lb), ajaxTransport: yb(wc), ajax: function (b, c) {
            function g(ya, Ra, ma, hb) {
                var Sa = Ra; if (2 !== Xa) {
                    Xa = 2; t && clearTimeout(t); C = void 0; r = hb || ""; sa.readyState = 0 < ya ? 4 : 0; hb = 200 <= ya && 300 > ya || 304 === ya; if (ma) {
                        var wa = K; for (var za = sa, qb, sb, Ma, Ea, Ua = wa.contents, xb = wa.dataTypes; "*" === xb[0];)xb.shift(), void 0 === sb && (sb = wa.mimeType || za.getResponseHeader("Content-Type")); if (sb) for (Ea in Ua) if (Ua[Ea] && Ua[Ea].test(sb)) { xb.unshift(Ea); break } if (xb[0] in ma) Ma = xb[0]; else {
                            for (Ea in ma) {
                                if (!xb[0] ||
                                    wa.converters[Ea + " " + xb[0]]) { Ma = Ea; break } qb || (qb = Ea)
                            } Ma = Ma || qb
                        } Ma ? (Ma !== xb[0] && xb.unshift(Ma), wa = ma[Ma]) : wa = void 0
                    } a: {
                        ma = K; qb = wa; sb = sa; Ma = hb; var Ob; za = {}; Ua = ma.dataTypes.slice(); if (Ua[1]) for (fb in ma.converters) za[fb.toLowerCase()] = ma.converters[fb]; for (Ea = Ua.shift(); Ea;) {
                            ma.responseFields[Ea] && (sb[ma.responseFields[Ea]] = qb); !ba && Ma && ma.dataFilter && (qb = ma.dataFilter(qb, ma.dataType)); var ba = Ea; if (Ea = Ua.shift()) if ("*" === Ea) Ea = ba; else if ("*" !== ba && ba !== Ea) {
                                var fb = za[ba + " " + Ea] || za["* " + Ea]; if (!fb) for (Ob in za) if (wa =
                                    Ob.split(" "), wa[1] === Ea && (fb = za[ba + " " + wa[0]] || za["* " + wa[0]])) { !0 === fb ? fb = za[Ob] : !0 !== za[Ob] && (Ea = wa[0], Ua.unshift(wa[1])); break } if (!0 !== fb) if (fb && ma["throws"]) qb = fb(qb); else try { qb = fb(qb) } catch (Hb) { wa = { state: "parsererror", error: fb ? Hb : "No conversion from " + ba + " to " + Ea }; break a }
                            }
                        } wa = { state: "success", data: qb }
                    } if (hb) if (K.ifModified && ((Sa = sa.getResponseHeader("Last-Modified")) && (h.lastModified[$a] = Sa), (Sa = sa.getResponseHeader("etag")) && (h.etag[$a] = Sa)), 204 === ya || "HEAD" === K.type) Sa = "nocontent"; else if (304 ===
                        ya) Sa = "notmodified"; else { Sa = wa.state; var Ab = wa.data; var ob = wa.error; hb = !ob } else if (ob = Sa, ya || !Sa) Sa = "error", 0 > ya && (ya = 0); sa.status = ya; sa.statusText = (Ra || Sa) + ""; hb ? X.resolveWith(Q, [Ab, Sa, sa]) : X.rejectWith(Q, [sa, Sa, ob]); sa.statusCode(La); La = void 0; v && T.trigger(hb ? "ajaxSuccess" : "ajaxError", [sa, K, hb ? Ab : ob]); xa.fireWith(Q, [sa, Sa]); v && (T.trigger("ajaxComplete", [sa, K]), --h.active || h.event.trigger("ajaxStop"))
                }
            } "object" === typeof b && (c = b, b = void 0); c = c || {}; var l, r, t, v, C, I, K = h.ajaxSetup({}, c), Q = K.context || K,
                T = K.context && (Q.nodeType || Q.jquery) ? h(Q) : h.event, X = h.Deferred(), xa = h.Callbacks("once memory"), La = K.statusCode || {}, nb = {}, Qa = {}, Xa = 0, Fb = "canceled", sa = {
                    readyState: 0, getResponseHeader: function (ya) { var Ra; if (2 === Xa) { if (!I) for (I = {}; Ra = qc.exec(r);)I[Ra[1].toLowerCase()] = Ra[2]; Ra = I[ya.toLowerCase()] } return null == Ra ? null : Ra }, getAllResponseHeaders: function () { return 2 === Xa ? r : null }, setRequestHeader: function (ya, Ra) { var ma = ya.toLowerCase(); Xa || (ya = Qa[ma] = Qa[ma] || ya, nb[ya] = Ra); return this }, overrideMimeType: function (ya) {
                        Xa ||
                        (K.mimeType = ya); return this
                    }, statusCode: function (ya) { var Ra; if (ya) if (2 > Xa) for (Ra in ya) La[Ra] = [La[Ra], ya[Ra]]; else sa.always(ya[sa.status]); return this }, abort: function (ya) { ya = ya || Fb; C && C.abort(ya); g(0, ya); return this }
                }; X.promise(sa).complete = xa.add; sa.success = sa.done; sa.error = sa.fail; K.url = ((b || K.url || ib) + "").replace(ae, "").replace(Vd, lb[1] + "//"); K.type = c.method || c.type || K.method || K.type; K.dataTypes = h.trim(K.dataType || "*").toLowerCase().match(Kb) || [""]; if (null == K.crossDomain) {
                    var Db = Qb.exec(K.url.toLowerCase());
                    K.crossDomain = !(!Db || Db[1] === lb[1] && Db[2] === lb[2] && (Db[3] || ("http:" === Db[1] ? "80" : "443")) === (lb[3] || ("http:" === lb[1] ? "80" : "443")))
                } K.data && K.processData && "string" !== typeof K.data && (K.data = h.param(K.data, K.traditional)); gb(Lb, K, c, sa); if (2 === Xa) return sa; (v = K.global) && 0 === h.active++ && h.event.trigger("ajaxStart"); K.type = K.type.toUpperCase(); K.hasContent = !xd.test(K.type); var $a = K.url; K.hasContent || (K.data && ($a = K.url += (na.test($a) ? "&" : "?") + K.data, delete K.data), !1 === K.cache && (K.url = Nc.test($a) ? $a.replace(Nc,
                    "$1_=" + lc++) : $a + (na.test($a) ? "&" : "?") + "_=" + lc++)); K.ifModified && (h.lastModified[$a] && sa.setRequestHeader("If-Modified-Since", h.lastModified[$a]), h.etag[$a] && sa.setRequestHeader("If-None-Match", h.etag[$a])); (K.data && K.hasContent && !1 !== K.contentType || c.contentType) && sa.setRequestHeader("Content-Type", K.contentType); sa.setRequestHeader("Accept", K.dataTypes[0] && K.accepts[K.dataTypes[0]] ? K.accepts[K.dataTypes[0]] + ("*" !== K.dataTypes[0] ? ", " + Oa + "; q=0.01" : "") : K.accepts["*"]); for (l in K.headers) sa.setRequestHeader(l,
                        K.headers[l]); if (K.beforeSend && (!1 === K.beforeSend.call(Q, sa, K) || 2 === Xa)) return sa.abort(); Fb = "abort"; for (l in { success: 1, error: 1, complete: 1 }) sa[l](K[l]); if (C = gb(wc, K, c, sa)) { sa.readyState = 1; v && T.trigger("ajaxSend", [sa, K]); K.async && 0 < K.timeout && (t = setTimeout(function () { sa.abort("timeout") }, K.timeout)); try { Xa = 1, C.send(nb, g) } catch (ya) { if (2 > Xa) g(-1, ya); else throw ya; } } else g(-1, "No Transport"); return sa
        }, getJSON: function (b, c, g) { return h.get(b, c, g, "json") }, getScript: function (b, c) {
            return h.get(b, void 0, c,
                "script")
        }
    }); h.each(["get", "post"], function (b, c) { h[c] = function (g, l, r, t) { h.isFunction(l) && (t = t || r, r = l, l = void 0); return h.ajax({ url: g, type: c, dataType: t, data: l, success: r }) } }); h.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (b, c) { h.fn[c] = function (g) { return this.on(c, g) } }); h._evalUrl = function (b) { return h.ajax({ url: b, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }; h.fn.extend({
        wrapAll: function (b) {
            if (h.isFunction(b)) return this.each(function (g) {
                h(this).wrapAll(b.call(this,
                    g))
            }); if (this[0]) { var c = h(b, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && c.insertBefore(this[0]); c.map(function () { for (var g = this; g.firstChild && 1 === g.firstChild.nodeType;)g = g.firstChild; return g }).append(this) } return this
        }, wrapInner: function (b) { return h.isFunction(b) ? this.each(function (c) { h(this).wrapInner(b.call(this, c)) }) : this.each(function () { var c = h(this), g = c.contents(); g.length ? g.wrapAll(b) : c.append(b) }) }, wrap: function (b) {
            var c = h.isFunction(b); return this.each(function (g) {
                h(this).wrapAll(c ?
                    b.call(this, g) : b)
            })
        }, unwrap: function () { return this.parent().each(function () { h.nodeName(this, "body") || h(this).replaceWith(this.childNodes) }).end() }
    }); h.expr.filters.hidden = function (b) { return 0 >= b.offsetWidth && 0 >= b.offsetHeight || !da.reliableHiddenOffsets() && "none" === (b.style && b.style.display || h.css(b, "display")) }; h.expr.filters.visible = function (b) { return !h.expr.filters.hidden(b) }; var pa = /%20/g, Dd = /\[\]$/, be = /\r?\n/g, Pa = /^(?:submit|button|image|reset|file)$/i, va = /^(?:input|select|textarea|keygen)/i;
    h.param = function (b, c) { var g, l = [], r = function (t, v) { v = h.isFunction(v) ? v() : null == v ? "" : v; l[l.length] = encodeURIComponent(t) + "=" + encodeURIComponent(v) }; void 0 === c && (c = h.ajaxSettings && h.ajaxSettings.traditional); if (h.isArray(b) || b.jquery && !h.isPlainObject(b)) h.each(b, function () { r(this.name, this.value) }); else for (g in b) Ac(g, b[g], c, r); return l.join("&").replace(pa, "+") }; h.fn.extend({
        serialize: function () { return h.param(this.serializeArray()) }, serializeArray: function () {
            return this.map(function () {
                var b = h.prop(this,
                    "elements"); return b ? h.makeArray(b) : this
            }).filter(function () { var b = this.type; return this.name && !h(this).is(":disabled") && va.test(this.nodeName) && !Pa.test(b) && (this.checked || !Sc.test(b)) }).map(function (b, c) { var g = h(this).val(); return null == g ? null : h.isArray(g) ? h.map(g, function (l) { return { name: c.name, value: l.replace(be, "\r\n") } }) : { name: c.name, value: g.replace(be, "\r\n") } }).get()
        }
    }); h.ajaxSettings.xhr = void 0 !== d.ActiveXObject ? function () {
        var b; if (!(b = !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) &&
            Oc())) a: { try { b = new d.ActiveXObject("Microsoft.XMLHTTP"); break a } catch (c) { } b = void 0 } return b
    } : Oc; var nd = 0, nc = {}, db = h.ajaxSettings.xhr(); if (d.ActiveXObject) h(d).on("unload", function () { for (var b in nc) nc[b](void 0, !0) }); da.cors = !!db && "withCredentials" in db; (db = da.ajax = !!db) && h.ajaxTransport(function (b) {
        if (!b.crossDomain || da.cors) {
            var c; return {
                send: function (g, l) {
                    var r, t = b.xhr(), v = ++nd; t.open(b.type, b.url, b.async, b.username, b.password); if (b.xhrFields) for (r in b.xhrFields) t[r] = b.xhrFields[r]; b.mimeType &&
                        t.overrideMimeType && t.overrideMimeType(b.mimeType); b.crossDomain || g["X-Requested-With"] || (g["X-Requested-With"] = "XMLHttpRequest"); for (r in g) void 0 !== g[r] && t.setRequestHeader(r, g[r] + ""); t.send(b.hasContent && b.data || null); c = function (C, I) {
                            if (c && (I || 4 === t.readyState)) if (delete nc[v], c = void 0, t.onreadystatechange = h.noop, I) 4 !== t.readyState && t.abort(); else {
                                var K = {}; var Q = t.status; "string" === typeof t.responseText && (K.text = t.responseText); try { var T = t.statusText } catch (X) { T = "" } Q || !b.isLocal || b.crossDomain ?
                                    1223 === Q && (Q = 204) : Q = K.text ? 200 : 404
                            } K && l(Q, T, K, t.getAllResponseHeaders())
                        }; b.async ? 4 === t.readyState ? setTimeout(c) : t.onreadystatechange = nc[v] = c : c()
                }, abort: function () { c && c(void 0, !0) }
            }
        }
    }); h.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (b) { h.globalEval(b); return b } } }); h.ajaxPrefilter("script", function (b) {
        void 0 === b.cache && (b.cache = !1); b.crossDomain && (b.type =
            "GET", b.global = !1)
    }); h.ajaxTransport("script", function (b) {
        if (b.crossDomain) {
            var c, g = ia.head || h("head")[0] || ia.documentElement; return {
                send: function (l, r) { c = ia.createElement("script"); c.async = !0; b.scriptCharset && (c.charset = b.scriptCharset); c.src = b.url; c.onload = c.onreadystatechange = function (t, v) { if (v || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, v || r(200, "success") }; g.insertBefore(c, g.firstChild) }, abort: function () {
                    if (c) c.onload(void 0,
                        !0)
                }
            }
        }
    }); var pd = [], Tc = /(=)\?(?=&|$)|\?\?/; h.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var b = pd.pop() || h.expando + "_" + lc++; this[b] = !0; return b } }); h.ajaxPrefilter("json jsonp", function (b, c, g) {
        var l, r = !1 !== b.jsonp && (Tc.test(b.url) ? "url" : "string" === typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Tc.test(b.data) && "data"); if (r || "jsonp" === b.dataTypes[0]) {
            var t = b.jsonpCallback = h.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback; r ? b[r] = b[r].replace(Tc,
                "$1" + t) : !1 !== b.jsonp && (b.url += (na.test(b.url) ? "&" : "?") + b.jsonp + "=" + t); b.converters["script json"] = function () { l || h.error(t + " was not called"); return l[0] }; b.dataTypes[0] = "json"; var v = d[t]; d[t] = function () { l = arguments }; g.always(function () { d[t] = v; b[t] && (b.jsonpCallback = c.jsonpCallback, pd.push(t)); l && h.isFunction(v) && v(l[0]); l = v = void 0 }); return "script"
        }
    }); h.parseHTML = function (b, c, g) {
        if (!b || "string" !== typeof b) return null; "boolean" === typeof c && (g = c, c = !1); c = c || ia; var l = Td.exec(b); g = !g && []; if (l) return [c.createElement(l[1])];
        l = h.buildFragment([b], c, g); g && g.length && h(g).remove(); return h.merge([], l.childNodes)
    }; var Cd = h.fn.load; h.fn.load = function (b, c, g) {
        if ("string" !== typeof b && Cd) return Cd.apply(this, arguments); var l, r, t = this, v = b.indexOf(" "); if (0 <= v) { var C = b.slice(v, b.length); b = b.slice(0, v) } h.isFunction(c) ? (g = c, c = void 0) : c && "object" === typeof c && (r = "POST"); 0 < t.length && h.ajax({ url: b, type: r, dataType: "html", data: c }).done(function (I) { l = arguments; t.html(C ? h("<div>").append(h.parseHTML(I)).find(C) : I) }).complete(g && function (I,
            K) { t.each(g, l || [I.responseText, K, I]) }); return this
    }; h.expr.filters.animated = function (b) { return h.grep(h.timers, function (c) { return b === c.elem }).length }; var kd = d.document.documentElement; h.offset = {
        setOffset: function (b, c, g) {
            var l = h.css(b, "position"), r = h(b), t = {}; "static" === l && (b.style.position = "relative"); var v = r.offset(); var C = h.css(b, "top"); var I = h.css(b, "left"); ("absolute" === l || "fixed" === l) && -1 < h.inArray("auto", [C, I]) ? (I = r.position(), C = I.top, I = I.left) : (C = parseFloat(C) || 0, I = parseFloat(I) || 0); h.isFunction(c) &&
                (c = c.call(b, g, v)); null != c.top && (t.top = c.top - v.top + C); null != c.left && (t.left = c.left - v.left + I); "using" in c ? c.using.call(b, t) : r.css(t)
        }
    }; h.fn.extend({
        offset: function (b) {
            if (arguments.length) return void 0 === b ? this : this.each(function (t) { h.offset.setOffset(this, b, t) }); var c, g = { top: 0, left: 0 }, l = (c = this[0]) && c.ownerDocument; if (l) {
                var r = l.documentElement; if (!h.contains(r, c)) return g; "undefined" !== typeof c.getBoundingClientRect && (g = c.getBoundingClientRect()); c = Pc(l); return {
                    top: g.top + (c.pageYOffset || r.scrollTop) -
                        (r.clientTop || 0), left: g.left + (c.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
                }
            }
        }, position: function () { if (this[0]) { var b = { top: 0, left: 0 }, c = this[0]; if ("fixed" === h.css(c, "position")) var g = c.getBoundingClientRect(); else { var l = this.offsetParent(); g = this.offset(); h.nodeName(l[0], "html") || (b = l.offset()); b.top += h.css(l[0], "borderTopWidth", !0); b.left += h.css(l[0], "borderLeftWidth", !0) } return { top: g.top - b.top - h.css(c, "marginTop", !0), left: g.left - b.left - h.css(c, "marginLeft", !0) } } }, offsetParent: function () {
            return this.map(function () {
                for (var b =
                    this.offsetParent || kd; b && !h.nodeName(b, "html") && "static" === h.css(b, "position");)b = b.offsetParent; return b || kd
            })
        }
    }); h.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (b, c) { var g = /Y/.test(c); h.fn[b] = function (l) { return Rb(this, function (r, t, v) { var C = Pc(r); if (void 0 === v) return C ? c in C ? C[c] : C.document.documentElement[t] : r[t]; C ? C.scrollTo(g ? h(C).scrollLeft() : v, g ? v : h(C).scrollTop()) : r[t] = v }, b, l, arguments.length, null) } }); h.each(["top", "left"], function (b, c) {
        h.cssHooks[c] = V(da.pixelPosition,
            function (g, l) { if (l) return l = zb(g, c), Wc.test(l) ? h(g).position()[c] + "px" : l })
    }); h.each({ Height: "height", Width: "width" }, function (b, c) {
        h.each({ padding: "inner" + b, content: c, "": "outer" + b }, function (g, l) {
            h.fn[l] = function (r, t) {
                var v = arguments.length && (g || "boolean" !== typeof r), C = g || (!0 === r || !0 === t ? "margin" : "border"); return Rb(this, function (I, K, Q) {
                    return h.isWindow(I) ? I.document.documentElement["client" + b] : 9 === I.nodeType ? (K = I.documentElement, Math.max(I.body["scroll" + b], K["scroll" + b], I.body["offset" + b], K["offset" +
                        b], K["client" + b])) : void 0 === Q ? h.css(I, K, C) : h.style(I, K, Q, C)
                }, c, v ? r : void 0, v, null)
            }
        })
    }); h.fn.size = function () { return this.length }; h.fn.andSelf = h.fn.addBack; "function" === typeof define && define.amd && define("jquery", [], function () { return h }); var ld = d.jQuery, md = d.$; h.noConflict = function (b) { d.$ === h && (d.$ = md); b && d.jQuery === h && (d.jQuery = ld); return h }; "undefined" === typeof m && (d.jQuery = d.$ = h); return h
});
(function (d, m) {
    function f(p, q, u, x, E) {
        function z() {
            ua = 1 < d.devicePixelRatio; u = H(u); 0 <= q.delay && setTimeout(function () { L(!0) }, q.delay); if (0 > q.delay || q.combined) x.e = Y(q.throttle, function (V) { "resize" === V.type && (Na = Ka = -1); L(V.all) }), x.a = function (V) { V = H(V); u.push.apply(u, V) }, x.g = function () { return u = e(u).filter(function () { return !e(this).data(q.loadedName) }) }, x.f = function (V) { for (var Fa = 0; Fa < V.length; Fa++) { var ea = u.filter(function () { return this === V[Fa] }); ea.length && L(!1, ea) } }, L(), e(q.appendScroll).on("scroll." +
                E + " resize." + E, x.e)
        } function H(V) {
            var Fa = q.defaultImage, ea = q.placeholder, Da = q.imageBase, Wa = q.srcsetAttribute, G = q.loaderAttribute, U = q._f || {}; V = e(V).filter(function () { var yb = e(this), gb = this.tagName.toLowerCase(); return !yb.data(q.handledName) && (yb.attr(q.attribute) || yb.attr(Wa) || yb.attr(G) || U[gb] !== m) }).data("plugin_" + q.name, p); for (var ha = 0, qa = V.length; ha < qa; ha++) {
                var Ca = e(V[ha]), mb = V[ha].tagName.toLowerCase(), rb = Ca.attr(q.imageBaseAttribute) || Da; "img" === mb && rb && Ca.attr(Wa) && Ca.attr(Wa, N(Ca.attr(Wa),
                    rb)); U[mb] === m || Ca.attr(G) || Ca.attr(G, U[mb]); "img" === mb && Fa && !Ca.attr("src") ? Ca.attr("src", Fa) : "img" === mb || !ea || Ca.css("background-image") && "none" !== Ca.css("background-image") || Ca.css("background-image", "url('" + ea + "')")
            } return V
        } function L(V, Fa) {
            if (u.length) {
                for (var ea = Fa || u, Da = !1, Wa = q.imageBase || "", G = q.srcsetAttribute, U = q.handledName, ha = 0; ha < ea.length; ha++)if (V || Fa || M(ea[ha])) {
                    var qa = e(ea[ha]), Ca = ea[ha].tagName.toLowerCase(), mb = qa.attr(q.attribute), rb = qa.attr(q.imageBaseAttribute) || Wa, yb = qa.attr(q.loaderAttribute);
                    qa.data(U) || q.visibleOnly && !qa.is(":visible") || !((mb || qa.attr(G)) && ("img" === Ca && (rb + mb !== qa.attr("src") || qa.attr(G) !== qa.attr("srcset")) || "img" !== Ca && rb + mb !== qa.css("background-image")) || yb) || (Da = !0, qa.data(U, !0), D(qa, Ca, rb, yb))
                } Da && (u = e(u).filter(function () { return !e(this).data(U) }))
            } else q.autoDestroy && p.destroy()
        } function D(V, Fa, ea, Da) {
            ++ka; var Wa = function () { fa("onError", V); aa(); Wa = e.noop }; fa("beforeLoad", V); var G = q.attribute, U = q.srcsetAttribute, ha = q.sizesAttribute, qa = q.retinaAttribute, Ca = q.removeAttribute,
                mb = q.loadedName, rb = V.attr(qa); if (Da) { var yb = function () { Ca && V.removeAttr(q.loaderAttribute); V.data(mb, !0); fa("afterLoad", V); setTimeout(aa, 1); yb = e.noop }; V.off("error").one("error", Wa).one("load", yb); fa(Da, V, function (ra) { ra ? (V.off("load"), yb()) : (V.off("error"), Wa()) }) || V.trigger("error") } else {
                    var gb = e(new Image); gb.one("error", Wa).one("load", function () {
                        V.hide(); "img" === Fa ? V.attr("sizes", gb.attr("sizes")).attr("srcset", gb.attr("srcset")).attr("src", gb.attr("src")) : V.css("background-image", "url('" + gb.attr("src") +
                            "')"); V[q.effect](q.effectTime); Ca && (V.removeAttr(G + " " + U + " " + qa + " " + q.imageBaseAttribute), "sizes" !== ha && V.removeAttr(ha)); V.data(mb, !0); fa("afterLoad", V); gb.remove(); aa()
                    }); Da = (ua && rb ? rb : V.attr(G)) || ""; gb.attr("sizes", V.attr(ha)).attr("srcset", V.attr(U)).attr("src", Da ? ea + Da : null); gb.complete && gb.trigger("load")
                }
        } function M(V) {
            var Fa = V.getBoundingClientRect(); V = q.scrollDirection; var ea = q.threshold, Da = (0 <= Ka ? Ka : Ka = e(d).height()) + ea > Fa.top && -ea < Fa.bottom; Fa = (0 <= Na ? Na : Na = e(d).width()) + ea > Fa.left && -ea <
                Fa.right; return "vertical" === V ? Da : "horizontal" === V ? Fa : Da && Fa
        } function N(V, Fa) { if (Fa) { var ea = V.split(","); V = ""; for (var Da = 0, Wa = ea.length; Da < Wa; Da++)V += Fa + ea[Da].trim() + (Da !== Wa - 1 ? "," : "") } return V } function Y(V, Fa) { var ea, Da = 0; return function (Wa, G) { function U() { Da = +new Date; Fa.call(p, Wa) } var ha = +new Date - Da; ea && clearTimeout(ea); ha > V || !q.enableThrottle || G ? U() : ea = setTimeout(U, V - ha) } } function aa() { --ka; u.length || ka || fa("onFinishedAll") } function fa(V, Fa, ea) {
            return (V = q[V]) ? (V.apply(p, [].slice.call(arguments,
                1)), !0) : !1
        } var ka = 0, Na = -1, Ka = -1, ua = !1; if ("event" === q.bind || n) z(); else e(d).on("load." + E, z)
    } function a(p, q) {
        var u = this, x = e.extend({}, u.config, q), E = {}, z = x.name + "-" + ++k; u.config = function (H, L) { if (L === m) return x[H]; x[H] = L; return u }; u.addItems = function (H) { E.a && E.a("string" === e.type(H) ? e(H) : H); return u }; u.getItems = function () { return E.g ? E.g() : {} }; u.update = function (H) { E.e && E.e({}, !H); return u }; u.force = function (H) { E.f && E.f("string" === e.type(H) ? e(H) : H); return u }; u.loadAll = function () { E.e && E.e({ all: !0 }, !0); return u };
        u.destroy = function () { e(x.appendScroll).off("." + z, E.e); e(d).off("." + z); E = {}; return m }; f(u, x, p, E, z); return x.chainable ? p : u
    } var e = d.jQuery || d.Zepto, k = 0, n = !1; e.fn.Lazy = e.fn.lazy = function (p) { return new a(this, p) }; e.Lazy = e.lazy = function (p, q, u) { e.isFunction(q) && (u = q, q = []); if (e.isFunction(u)) { p = e.isArray(p) ? p : [p]; q = e.isArray(q) ? q : [q]; for (var x = a.prototype.config, E = x._f || (x._f = {}), z = 0, H = p.length; z < H; z++)if (x[p[z]] === m || e.isFunction(x[p[z]])) x[p[z]] = u; u = 0; for (x = q.length; u < x; u++)E[q[u]] = p[0] } }; a.prototype.config =
    {
        name: "lazy", chainable: !0, autoDestroy: !0, bind: "load", threshold: 500, visibleOnly: !1, appendScroll: d, scrollDirection: "both", imageBase: null, defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", placeholder: null, delay: -1, combined: !1, attribute: "data-src", srcsetAttribute: "data-srcset", sizesAttribute: "data-sizes", retinaAttribute: "data-retina", loaderAttribute: "data-loader", imageBaseAttribute: "data-imagebase", removeAttribute: !0, handledName: "handled", loadedName: "loaded",
        effect: "show", effectTime: 0, enableThrottle: !0, throttle: 250, beforeLoad: m, afterLoad: m, onError: m, onFinishedAll: m
    }; e(d).on("load", function () { n = !0 })
})(window); if ("undefined" === typeof jQuery) throw Error("Bootstrap's JavaScript requires jQuery"); +function (d) { d = d.fn.jquery.split(" ")[0].split("."); if (2 > d[0] && 9 > d[1] || 1 == d[0] && 9 == d[1] && 1 > d[2] || 3 < d[0]) throw Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"); }(jQuery);
+function (d) {
    function m() { var f = document.createElement("bootstrap"), a = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, e; for (e in a) if (void 0 !== f.style[e]) return { end: a[e] }; return !1 } d.fn.emulateTransitionEnd = function (f) { var a = !1, e = this; d(this).one("bsTransitionEnd", function () { a = !0 }); setTimeout(function () { a || d(e).trigger(d.support.transition.end) }, f); return this }; d(function () {
        d.support.transition = m(); d.support.transition &&
            (d.event.special.bsTransitionEnd = { bindType: d.support.transition.end, delegateType: d.support.transition.end, handle: function (f) { if (d(f.target).is(this)) return f.handleObj.handler.apply(this, arguments) } })
    })
}(jQuery);
+function (d) {
    var m = function (a) { d(a).on("click", '[data-dismiss="alert"]', this.close) }; m.VERSION = "3.4.1"; m.TRANSITION_DURATION = 150; m.prototype.close = function (a) {
        function e() { p.detach().trigger("closed.bs.alert").remove() } var k = d(this), n = k.attr("data-target"); n || (n = (n = k.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")); n = "#" === n ? [] : n; var p = d(document).find(n); a && a.preventDefault(); p.length || (p = k.closest(".alert")); p.trigger(a = d.Event("close.bs.alert")); a.isDefaultPrevented() || (p.removeClass("in"), d.support.transition &&
            p.hasClass("fade") ? p.one("bsTransitionEnd", e).emulateTransitionEnd(m.TRANSITION_DURATION) : e())
    }; var f = d.fn.alert; d.fn.alert = function (a) { return this.each(function () { var e = d(this), k = e.data("bs.alert"); k || e.data("bs.alert", k = new m(this)); "string" == typeof a && k[a].call(e) }) }; d.fn.alert.Constructor = m; d.fn.alert.noConflict = function () { d.fn.alert = f; return this }; d(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', m.prototype.close)
}(jQuery);
+function (d) {
    function m(e) { return this.each(function () { var k = d(this), n = k.data("bs.button"), p = "object" == typeof e && e; n || k.data("bs.button", n = new f(this, p)); "toggle" == e ? n.toggle() : e && n.setState(e) }) } var f = function (e, k) { this.$element = d(e); this.options = d.extend({}, f.DEFAULTS, k); this.isLoading = !1 }; f.VERSION = "3.4.1"; f.DEFAULTS = { loadingText: "loading..." }; f.prototype.setState = function (e) {
        var k = this.$element, n = k.is("input") ? "val" : "html", p = k.data(); e += "Text"; null == p.resetText && k.data("resetText", k[n]()); setTimeout(d.proxy(function () {
            k[n](null ==
                p[e] ? this.options[e] : p[e]); "loadingText" == e ? (this.isLoading = !0, k.addClass("disabled").attr("disabled", "disabled").prop("disabled", !0)) : this.isLoading && (this.isLoading = !1, k.removeClass("disabled").removeAttr("disabled").prop("disabled", !1))
        }, this), 0)
    }; f.prototype.toggle = function () {
        var e = !0, k = this.$element.closest('[data-toggle="buttons"]'); if (k.length) {
            var n = this.$element.find("input"); "radio" == n.prop("type") ? (n.prop("checked") && (e = !1), k.find(".active").removeClass("active"), this.$element.addClass("active")) :
                "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")); n.prop("checked", this.$element.hasClass("active")); e && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    }; var a = d.fn.button; d.fn.button = m; d.fn.button.Constructor = f; d.fn.button.noConflict = function () { d.fn.button = a; return this }; d(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        var k =
            d(e.target).closest(".btn"); m.call(k, "toggle"); d(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), k.is("input,button") ? k.trigger("focus") : k.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) { d(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type)) })
}(jQuery);
+function (d) {
    function m(k) { return this.each(function () { var n = d(this), p = n.data("bs.carousel"), q = d.extend({}, f.DEFAULTS, n.data(), "object" == typeof k && k), u = "string" == typeof k ? k : q.slide; p || n.data("bs.carousel", p = new f(this, q)); if ("number" == typeof k) p.to(k); else if (u) p[u](); else q.interval && p.pause().cycle() }) } var f = function (k, n) {
        this.$element = d(k); this.$indicators = this.$element.find(".carousel-indicators"); this.options = n; this.$items = this.$active = this.interval = this.sliding = this.paused = null; this.options.keyboard &&
            this.$element.on("keydown.bs.carousel", d.proxy(this.keydown, this)); "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", d.proxy(this.pause, this)).on("mouseleave.bs.carousel", d.proxy(this.cycle, this))
    }; f.VERSION = "3.4.1"; f.TRANSITION_DURATION = 600; f.DEFAULTS = { interval: 5E3, pause: "hover", wrap: !0, keyboard: !0 }; f.prototype.keydown = function (k) {
        if (!/input|textarea/i.test(k.target.tagName)) {
            switch (k.which) {
                case 37: this.prev(); break; case 39: this.next();
                    break; default: return
            }k.preventDefault()
        }
    }; f.prototype.cycle = function (k) { k || (this.paused = !1); this.interval && clearInterval(this.interval); this.options.interval && !this.paused && (this.interval = setInterval(d.proxy(this.next, this), this.options.interval)); return this }; f.prototype.getItemIndex = function (k) { this.$items = k.parent().children(".item"); return this.$items.index(k || this.$active) }; f.prototype.getItemForDirection = function (k, n) {
        var p = this.getItemIndex(n); return ("prev" == k && 0 === p || "next" == k && p == this.$items.length -
            1) && !this.options.wrap ? n : this.$items.eq((p + ("prev" == k ? -1 : 1)) % this.$items.length)
    }; f.prototype.to = function (k) { var n = this, p = this.getItemIndex(this.$active = this.$element.find(".item.active")); if (!(k > this.$items.length - 1 || 0 > k)) return this.sliding ? this.$element.one("slid.bs.carousel", function () { n.to(k) }) : p == k ? this.pause().cycle() : this.slide(k > p ? "next" : "prev", this.$items.eq(k)) }; f.prototype.pause = function (k) {
        k || (this.paused = !0); this.$element.find(".next, .prev").length && d.support.transition && (this.$element.trigger(d.support.transition.end),
            this.cycle(!0)); this.interval = clearInterval(this.interval); return this
    }; f.prototype.next = function () { if (!this.sliding) return this.slide("next") }; f.prototype.prev = function () { if (!this.sliding) return this.slide("prev") }; f.prototype.slide = function (k, n) {
        var p = this.$element.find(".item.active"), q = n || this.getItemForDirection(k, p), u = this.interval, x = "next" == k ? "left" : "right", E = this; if (q.hasClass("active")) return this.sliding = !1; var z = q[0], H = d.Event("slide.bs.carousel", { relatedTarget: z, direction: x }); this.$element.trigger(H);
        if (!H.isDefaultPrevented()) {
            this.sliding = !0; u && this.pause(); this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), (H = d(this.$indicators.children()[this.getItemIndex(q)])) && H.addClass("active")); var L = d.Event("slid.bs.carousel", { relatedTarget: z, direction: x }); d.support.transition && this.$element.hasClass("slide") ? (q.addClass(k), "object" === typeof q && q.length && q[0].offsetWidth, p.addClass(x), q.addClass(x), p.one("bsTransitionEnd", function () {
                q.removeClass([k, x].join(" ")).addClass("active");
                p.removeClass(["active", x].join(" ")); E.sliding = !1; setTimeout(function () { E.$element.trigger(L) }, 0)
            }).emulateTransitionEnd(f.TRANSITION_DURATION)) : (p.removeClass("active"), q.addClass("active"), this.sliding = !1, this.$element.trigger(L)); u && this.cycle(); return this
        }
    }; var a = d.fn.carousel; d.fn.carousel = m; d.fn.carousel.Constructor = f; d.fn.carousel.noConflict = function () { d.fn.carousel = a; return this }; var e = function (k) {
        var n = d(this), p = n.attr("href"); p && (p = p.replace(/.*(?=#[^\s]+$)/, "")); p = n.attr("data-target") ||
            p; p = d(document).find(p); if (p.hasClass("carousel")) { var q = d.extend({}, p.data(), n.data()); if (n = n.attr("data-slide-to")) q.interval = !1; m.call(p, q); n && p.data("bs.carousel").to(n); k.preventDefault() }
    }; d(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e); d(window).on("load", function () { d('[data-ride="carousel"]').each(function () { var k = d(this); m.call(k, k.data()) }) })
}(jQuery);
+function (d) {
    function m(k) { var n; k = k.attr("data-target") || (n = k.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""); return d(document).find(k) } function f(k) { return this.each(function () { var n = d(this), p = n.data("bs.collapse"), q = d.extend({}, a.DEFAULTS, n.data(), "object" == typeof k && k); !p && q.toggle && /show|hide/.test(k) && (q.toggle = !1); p || n.data("bs.collapse", p = new a(this, q)); if ("string" == typeof k) p[k]() }) } var a = function (k, n) {
        this.$element = d(k); this.options = d.extend({}, a.DEFAULTS, n); this.$trigger = d('[data-toggle="collapse"][href="#' +
            k.id + '"],[data-toggle="collapse"][data-target="#' + k.id + '"]'); this.transitioning = null; this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger); this.options.toggle && this.toggle()
    }; a.VERSION = "3.4.1"; a.TRANSITION_DURATION = 350; a.DEFAULTS = { toggle: !0 }; a.prototype.dimension = function () { return this.$element.hasClass("width") ? "width" : "height" }; a.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var k, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (n && n.length && (k = n.data("bs.collapse")) && k.transitioning) return; var p = d.Event("show.bs.collapse"); this.$element.trigger(p); if (!p.isDefaultPrevented()) {
                n && n.length && (f.call(n, "hide"), k || n.data("bs.collapse", null)); var q = this.dimension(); this.$element.removeClass("collapse").addClass("collapsing")[q](0).attr("aria-expanded", !0); this.$trigger.removeClass("collapsed").attr("aria-expanded", !0); this.transitioning = 1; k = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[q](""); this.transitioning =
                        0; this.$element.trigger("shown.bs.collapse")
                }; if (!d.support.transition) return k.call(this); n = d.camelCase(["scroll", q].join("-")); this.$element.one("bsTransitionEnd", d.proxy(k, this)).emulateTransitionEnd(a.TRANSITION_DURATION)[q](this.$element[0][n])
            }
        }
    }; a.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var k = d.Event("hide.bs.collapse"); this.$element.trigger(k); if (!k.isDefaultPrevented()) {
                k = this.dimension(); this.$element[k](this.$element[k]())[0].offsetHeight; this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",
                    !1); this.$trigger.addClass("collapsed").attr("aria-expanded", !1); this.transitioning = 1; var n = function () { this.transitioning = 0; this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse") }; if (!d.support.transition) return n.call(this); this.$element[k](0).one("bsTransitionEnd", d.proxy(n, this)).emulateTransitionEnd(a.TRANSITION_DURATION)
            }
        }
    }; a.prototype.toggle = function () { this[this.$element.hasClass("in") ? "hide" : "show"]() }; a.prototype.getParent = function () {
        return d(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' +
            this.options.parent + '"]').each(d.proxy(function (k, n) { var p = d(n); this.addAriaAndCollapsedClass(m(p), p) }, this)).end()
    }; a.prototype.addAriaAndCollapsedClass = function (k, n) { var p = k.hasClass("in"); k.attr("aria-expanded", p); n.toggleClass("collapsed", !p).attr("aria-expanded", p) }; var e = d.fn.collapse; d.fn.collapse = f; d.fn.collapse.Constructor = a; d.fn.collapse.noConflict = function () { d.fn.collapse = e; return this }; d(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (k) {
        var n = d(this); n.attr("data-target") ||
            k.preventDefault(); k = m(n); n = k.data("bs.collapse") ? "toggle" : n.data(); f.call(k, n)
    })
}(jQuery);
+function (d) {
    function m(k) { var n = k.attr("data-target"); n || (n = (n = k.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")); return (n = "#" !== n ? d(document).find(n) : null) && n.length ? n : k.parent() } function f(k) {
        k && 3 === k.which || (d(".dropdown-backdrop").remove(), d('[data-toggle="dropdown"]').each(function () {
            var n = d(this), p = m(n), q = { relatedTarget: this }; !p.hasClass("open") || k && "click" == k.type && /input|textarea/i.test(k.target.tagName) && d.contains(p[0], k.target) || (p.trigger(k = d.Event("hide.bs.dropdown",
                q)), k.isDefaultPrevented() || (n.attr("aria-expanded", "false"), p.removeClass("open").trigger(d.Event("hidden.bs.dropdown", q))))
        }))
    } var a = function (k) { d(k).on("click.bs.dropdown", this.toggle) }; a.VERSION = "3.4.1"; a.prototype.toggle = function (k) {
        var n = d(this); if (!n.is(".disabled, :disabled")) {
            var p = m(n); k = p.hasClass("open"); f(); if (!k) {
                if ("ontouchstart" in document.documentElement && !p.closest(".navbar-nav").length) d(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(d(this)).on("click",
                    f); var q = { relatedTarget: this }; p.trigger(k = d.Event("show.bs.dropdown", q)); if (k.isDefaultPrevented()) return; n.trigger("focus").attr("aria-expanded", "true"); p.toggleClass("open").trigger(d.Event("shown.bs.dropdown", q))
            } return !1
        }
    }; a.prototype.keydown = function (k) {
        if (/(38|40|27|32)/.test(k.which) && !/input|textarea/i.test(k.target.tagName)) {
            var n = d(this); k.preventDefault(); k.stopPropagation(); if (!n.is(".disabled, :disabled")) {
                var p = m(n), q = p.hasClass("open"); if (!q && 27 != k.which || q && 27 == k.which) return 27 ==
                    k.which && p.find('[data-toggle="dropdown"]').trigger("focus"), n.trigger("click"); n = p.find(".dropdown-menu li:not(.disabled):visible a"); n.length && (p = n.index(k.target), 38 == k.which && 0 < p && p--, 40 == k.which && p < n.length - 1 && p++, ~p || (p = 0), n.eq(p).trigger("focus"))
            }
        }
    }; var e = d.fn.dropdown; d.fn.dropdown = function (k) { return this.each(function () { var n = d(this), p = n.data("bs.dropdown"); p || n.data("bs.dropdown", p = new a(this)); "string" == typeof k && p[k].call(n) }) }; d.fn.dropdown.Constructor = a; d.fn.dropdown.noConflict = function () {
        d.fn.dropdown =
        e; return this
    }; d(document).on("click.bs.dropdown.data-api", f).on("click.bs.dropdown.data-api", ".dropdown form", function (k) { k.stopPropagation() }).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', a.prototype.toggle).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery);
+function (d) {
    function m(e, k) { return this.each(function () { var n = d(this), p = n.data("bs.modal"), q = d.extend({}, f.DEFAULTS, n.data(), "object" == typeof e && e); p || n.data("bs.modal", p = new f(this, q)); if ("string" == typeof e) p[e](k); else q.show && p.show(k) }) } var f = function (e, k) {
        this.options = k; this.$body = d(document.body); this.$element = d(e); this.$dialog = this.$element.find(".modal-dialog"); this.originalBodyPad = this.isShown = this.$backdrop = null; this.scrollbarWidth = 0; this.ignoreBackdropClick = !1; this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom";
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, d.proxy(function () { this.$element.trigger("loaded.bs.modal") }, this))
    }; f.VERSION = "3.4.1"; f.TRANSITION_DURATION = 300; f.BACKDROP_TRANSITION_DURATION = 150; f.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }; f.prototype.toggle = function (e) { return this.isShown ? this.hide() : this.show(e) }; f.prototype.show = function (e) {
        var k = this, n = d.Event("show.bs.modal", { relatedTarget: e }); this.$element.trigger(n); this.isShown || n.isDefaultPrevented() ||
            (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', d.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () { k.$element.one("mouseup.dismiss.bs.modal", function (p) { d(p.target).is(k.$element) && (k.ignoreBackdropClick = !0) }) }), this.backdrop(function () {
                var p = d.support.transition && k.$element.hasClass("fade"); k.$element.parent().length || k.$element.appendTo(k.$body);
                k.$element.show().scrollTop(0); k.adjustDialog(); p && k.$element[0].offsetWidth; k.$element.addClass("in"); k.enforceFocus(); var q = d.Event("shown.bs.modal", { relatedTarget: e }); p ? k.$dialog.one("bsTransitionEnd", function () { k.$element.trigger("focus").trigger(q) }).emulateTransitionEnd(f.TRANSITION_DURATION) : k.$element.trigger("focus").trigger(q)
            }))
    }; f.prototype.hide = function (e) {
        e && e.preventDefault(); e = d.Event("hide.bs.modal"); this.$element.trigger(e); this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
            this.escape(), this.resize(), d(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), d.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", d.proxy(this.hideModal, this)).emulateTransitionEnd(f.TRANSITION_DURATION) : this.hideModal())
    }; f.prototype.enforceFocus = function () {
        d(document).off("focusin.bs.modal").on("focusin.bs.modal", d.proxy(function (e) {
            document ===
            e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }; f.prototype.escape = function () { if (this.isShown && this.options.keyboard) this.$element.on("keydown.dismiss.bs.modal", d.proxy(function (e) { 27 == e.which && this.hide() }, this)); else this.isShown || this.$element.off("keydown.dismiss.bs.modal") }; f.prototype.resize = function () { if (this.isShown) d(window).on("resize.bs.modal", d.proxy(this.handleUpdate, this)); else d(window).off("resize.bs.modal") }; f.prototype.hideModal =
        function () { var e = this; this.$element.hide(); this.backdrop(function () { e.$body.removeClass("modal-open"); e.resetAdjustments(); e.resetScrollbar(); e.$element.trigger("hidden.bs.modal") }) }; f.prototype.removeBackdrop = function () { this.$backdrop && this.$backdrop.remove(); this.$backdrop = null }; f.prototype.backdrop = function (e) {
            var k = this, n = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) {
                var p = d.support.transition && n; this.$backdrop = d(document.createElement("div")).addClass("modal-backdrop " +
                    n).appendTo(this.$body); this.$element.on("click.dismiss.bs.modal", d.proxy(function (q) { this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : q.target === q.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()) }, this)); p && this.$backdrop[0].offsetWidth; this.$backdrop.addClass("in"); e && (p ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(f.BACKDROP_TRANSITION_DURATION) : e())
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), n = function () {
                k.removeBackdrop();
                e && e()
            }, d.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(f.BACKDROP_TRANSITION_DURATION) : n()) : e && e()
        }; f.prototype.handleUpdate = function () { this.adjustDialog() }; f.prototype.adjustDialog = function () { var e = this.$element[0].scrollHeight > document.documentElement.clientHeight; this.$element.css({ paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : "" }) }; f.prototype.resetAdjustments =
            function () { this.$element.css({ paddingLeft: "", paddingRight: "" }) }; f.prototype.checkScrollbar = function () { var e = window.innerWidth; e || (e = document.documentElement.getBoundingClientRect(), e = e.right - Math.abs(e.left)); this.bodyIsOverflowing = document.body.clientWidth < e; this.scrollbarWidth = this.measureScrollbar() }; f.prototype.setScrollbar = function () {
                var e = parseInt(this.$body.css("padding-right") || 0, 10); this.originalBodyPad = document.body.style.paddingRight || ""; var k = this.scrollbarWidth; this.bodyIsOverflowing &&
                    (this.$body.css("padding-right", e + k), d(this.fixedContent).each(function (n, p) { var q = p.style.paddingRight, u = d(p).css("padding-right"); d(p).data("padding-right", q).css("padding-right", parseFloat(u) + k + "px") }))
            }; f.prototype.resetScrollbar = function () { this.$body.css("padding-right", this.originalBodyPad); d(this.fixedContent).each(function (e, k) { var n = d(k).data("padding-right"); d(k).removeData("padding-right"); k.style.paddingRight = n ? n : "" }) }; f.prototype.measureScrollbar = function () {
                var e = document.createElement("div");
                e.className = "modal-scrollbar-measure"; this.$body.append(e); var k = e.offsetWidth - e.clientWidth; this.$body[0].removeChild(e); return k
            }; var a = d.fn.modal; d.fn.modal = m; d.fn.modal.Constructor = f; d.fn.modal.noConflict = function () { d.fn.modal = a; return this }; d(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
                var k = d(this), n = k.attr("href"), p = k.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, ""), q = d(document).find(p); n = q.data("bs.modal") ? "toggle" : d.extend({ remote: !/#/.test(n) && n }, q.data(),
                    k.data()); k.is("a") && e.preventDefault(); q.one("show.bs.modal", function (u) { if (!u.isDefaultPrevented()) q.one("hidden.bs.modal", function () { k.is(":visible") && k.trigger("focus") }) }); m.call(q, n, this)
            })
}(jQuery);
+function (d) {
    function m(u, x) { var E = u.nodeName.toLowerCase(); if (-1 !== d.inArray(E, x)) return -1 !== d.inArray(E, e) ? !(!u.nodeValue.match(k) && !u.nodeValue.match(n)) : !0; for (var z = d(x).filter(function (D, M) { return M instanceof RegExp }), H = 0, L = z.length; H < L; H++)if (E.match(z[H])) return !0; return !1 } function f(u, x, E) {
        if (0 === u.length) return u; if (E && "function" === typeof E) return E(u); if (!document.implementation || !document.implementation.createHTMLDocument) return u; E = document.implementation.createHTMLDocument("sanitization");
        E.body.innerHTML = u; u = d.map(x, function (fa, ka) { return ka }); for (var z = d(E.body).find("*"), H = 0, L = z.length; H < L; H++) { var D = z[H], M = D.nodeName.toLowerCase(); if (-1 === d.inArray(M, u)) D.parentNode.removeChild(D); else { var N = d.map(D.attributes, function (fa) { return fa }); M = [].concat(x["*"] || [], x[M] || []); for (var Y = 0, aa = N.length; Y < aa; Y++)m(N[Y], M) || D.removeAttribute(N[Y].nodeName) } } return E.body.innerHTML
    } var a = ["sanitize", "whiteList", "sanitizeFn"], e = "background cite href itemtype longdesc poster src xlink:href".split(" "),
        k = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi, n = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i, p = function (u, x) { this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null; this.init("tooltip", u, x) }; p.VERSION = "3.4.1"; p.TRANSITION_DURATION = 150; p.DEFAULTS = {
            animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 }, sanitize: !0, sanitizeFn: null, whiteList: { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }
        }; p.prototype.init = function (u, x, E) {
            this.enabled = !0; this.type =
                u; this.$element = d(x); this.options = this.getOptions(E); this.$viewport = this.options.viewport && d(document).find(d.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport); this.inState = { click: !1, hover: !1, focus: !1 }; if (this.$element[0] instanceof document.constructor && !this.options.selector) throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!"); u = this.options.trigger.split(" ");
            for (x = u.length; x--;)if (E = u[x], "click" == E) this.$element.on("click." + this.type, this.options.selector, d.proxy(this.toggle, this)); else if ("manual" != E) { var z = "hover" == E ? "mouseleave" : "focusout"; this.$element.on(("hover" == E ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, d.proxy(this.enter, this)); this.$element.on(z + "." + this.type, this.options.selector, d.proxy(this.leave, this)) } this.options.selector ? this._options = d.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle()
        }; p.prototype.getDefaults =
            function () { return p.DEFAULTS }; p.prototype.getOptions = function (u) { var x = this.$element.data(), E; for (E in x) x.hasOwnProperty(E) && -1 !== d.inArray(E, a) && delete x[E]; u = d.extend({}, this.getDefaults(), x, u); u.delay && "number" == typeof u.delay && (u.delay = { show: u.delay, hide: u.delay }); u.sanitize && (u.template = f(u.template, u.whiteList, u.sanitizeFn)); return u }; p.prototype.getDelegateOptions = function () { var u = {}, x = this.getDefaults(); this._options && d.each(this._options, function (E, z) { x[E] != z && (u[E] = z) }); return u }; p.prototype.enter =
                function (u) {
                    var x = u instanceof this.constructor ? u : d(u.currentTarget).data("bs." + this.type); x || (x = new this.constructor(u.currentTarget, this.getDelegateOptions()), d(u.currentTarget).data("bs." + this.type, x)); u instanceof d.Event && (x.inState["focusin" == u.type ? "focus" : "hover"] = !0); if (x.tip().hasClass("in") || "in" == x.hoverState) x.hoverState = "in"; else {
                        clearTimeout(x.timeout); x.hoverState = "in"; if (!x.options.delay || !x.options.delay.show) return x.show(); x.timeout = setTimeout(function () { "in" == x.hoverState && x.show() },
                            x.options.delay.show)
                    }
                }; p.prototype.isInStateTrue = function () { for (var u in this.inState) if (this.inState[u]) return !0; return !1 }; p.prototype.leave = function (u) {
                    var x = u instanceof this.constructor ? u : d(u.currentTarget).data("bs." + this.type); x || (x = new this.constructor(u.currentTarget, this.getDelegateOptions()), d(u.currentTarget).data("bs." + this.type, x)); u instanceof d.Event && (x.inState["focusout" == u.type ? "focus" : "hover"] = !1); if (!x.isInStateTrue()) {
                        clearTimeout(x.timeout); x.hoverState = "out"; if (!x.options.delay ||
                            !x.options.delay.hide) return x.hide(); x.timeout = setTimeout(function () { "out" == x.hoverState && x.hide() }, x.options.delay.hide)
                    }
                }; p.prototype.show = function () {
                    var u = d.Event("show.bs." + this.type); if (this.hasContent() && this.enabled) {
                        this.$element.trigger(u); var x = d.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]); if (!u.isDefaultPrevented() && x) {
                            var E = this; u = this.tip(); x = this.getUID(this.type); this.setContent(); u.attr("id", x); this.$element.attr("aria-describedby", x); this.options.animation &&
                                u.addClass("fade"); x = "function" == typeof this.options.placement ? this.options.placement.call(this, u[0], this.$element[0]) : this.options.placement; var z = /\s?auto?\s?/i, H = z.test(x); H && (x = x.replace(z, "") || "top"); u.detach().css({ top: 0, left: 0, display: "block" }).addClass(x).data("bs." + this.type, this); this.options.container ? u.appendTo(d(document).find(this.options.container)) : u.insertAfter(this.$element); this.$element.trigger("inserted.bs." + this.type); z = this.getPosition(); var L = u[0].offsetWidth, D = u[0].offsetHeight;
                            if (H) { H = x; var M = this.getPosition(this.$viewport); x = "bottom" == x && z.bottom + D > M.bottom ? "top" : "top" == x && z.top - D < M.top ? "bottom" : "right" == x && z.right + L > M.width ? "left" : "left" == x && z.left - L < M.left ? "right" : x; u.removeClass(H).addClass(x) } z = this.getCalculatedOffset(x, z, L, D); this.applyPlacement(z, x); x = function () { var N = E.hoverState; E.$element.trigger("shown.bs." + E.type); E.hoverState = null; "out" == N && E.leave(E) }; d.support.transition && this.$tip.hasClass("fade") ? u.one("bsTransitionEnd", x).emulateTransitionEnd(p.TRANSITION_DURATION) :
                                x()
                        }
                    }
                }; p.prototype.applyPlacement = function (u, x) {
                    var E = this.tip(), z = E[0].offsetWidth, H = E[0].offsetHeight, L = parseInt(E.css("margin-top"), 10), D = parseInt(E.css("margin-left"), 10); isNaN(L) && (L = 0); isNaN(D) && (D = 0); u.top += L; u.left += D; d.offset.setOffset(E[0], d.extend({ using: function (Y) { E.css({ top: Math.round(Y.top), left: Math.round(Y.left) }) } }, u), 0); E.addClass("in"); D = E[0].offsetWidth; var M = E[0].offsetHeight; "top" == x && M != H && (u.top = u.top + H - M); var N = this.getViewportAdjustedDelta(x, u, D, M); N.left ? u.left += N.left :
                        u.top += N.top; z = (L = /top|bottom/.test(x)) ? 2 * N.left - z + D : 2 * N.top - H + M; H = L ? "offsetWidth" : "offsetHeight"; E.offset(u); this.replaceArrow(z, E[0][H], L)
                }; p.prototype.replaceArrow = function (u, x, E) { this.arrow().css(E ? "left" : "top", 50 * (1 - u / x) + "%").css(E ? "top" : "left", "") }; p.prototype.setContent = function () { var u = this.tip(), x = this.getTitle(); this.options.html ? (this.options.sanitize && (x = f(x, this.options.whiteList, this.options.sanitizeFn)), u.find(".tooltip-inner").html(x)) : u.find(".tooltip-inner").text(x); u.removeClass("fade in top bottom left right") };
    p.prototype.hide = function (u) { function x() { "in" != E.hoverState && z.detach(); E.$element && E.$element.removeAttr("aria-describedby").trigger("hidden.bs." + E.type); u && u() } var E = this, z = d(this.$tip), H = d.Event("hide.bs." + this.type); this.$element.trigger(H); if (!H.isDefaultPrevented()) return z.removeClass("in"), d.support.transition && z.hasClass("fade") ? z.one("bsTransitionEnd", x).emulateTransitionEnd(p.TRANSITION_DURATION) : x(), this.hoverState = null, this }; p.prototype.fixTitle = function () {
        var u = this.$element; (u.attr("title") ||
            "string" != typeof u.attr("data-original-title")) && u.attr("data-original-title", u.attr("title") || "").attr("title", "")
    }; p.prototype.hasContent = function () { return this.getTitle() }; p.prototype.getPosition = function (u) {
        u = u || this.$element; var x = u[0], E = "BODY" == x.tagName, z = x.getBoundingClientRect(); null == z.width && (z = d.extend({}, z, { width: z.right - z.left, height: z.bottom - z.top })); x = window.SVGElement && x instanceof window.SVGElement; x = E ? { top: 0, left: 0 } : x ? null : u.offset(); u = {
            scroll: E ? document.documentElement.scrollTop ||
                document.body.scrollTop : u.scrollTop()
        }; E = E ? { width: d(window).width(), height: d(window).height() } : null; return d.extend({}, z, u, E, x)
    }; p.prototype.getCalculatedOffset = function (u, x, E, z) { return "bottom" == u ? { top: x.top + x.height, left: x.left + x.width / 2 - E / 2 } : "top" == u ? { top: x.top - z, left: x.left + x.width / 2 - E / 2 } : "left" == u ? { top: x.top + x.height / 2 - z / 2, left: x.left - E } : { top: x.top + x.height / 2 - z / 2, left: x.left + x.width } }; p.prototype.getViewportAdjustedDelta = function (u, x, E, z) {
        var H = { top: 0, left: 0 }; if (!this.$viewport) return H; var L =
            this.options.viewport && this.options.viewport.padding || 0, D = this.getPosition(this.$viewport); /right|left/.test(u) ? (E = x.top - L - D.scroll, x = x.top + L - D.scroll + z, E < D.top ? H.top = D.top - E : x > D.top + D.height && (H.top = D.top + D.height - x)) : (z = x.left - L, x = x.left + L + E, z < D.left ? H.left = D.left - z : x > D.right && (H.left = D.left + D.width - x)); return H
    }; p.prototype.getTitle = function () { var u = this.$element, x = this.options; return u.attr("data-original-title") || ("function" == typeof x.title ? x.title.call(u[0]) : x.title) }; p.prototype.getUID = function (u) {
        do u +=
            ~~(1E6 * Math.random()); while (document.getElementById(u)); return u
    }; p.prototype.tip = function () { if (!this.$tip && (this.$tip = d(this.options.template), 1 != this.$tip.length)) throw Error(this.type + " `template` option must consist of exactly 1 top-level element!"); return this.$tip }; p.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }; p.prototype.enable = function () { this.enabled = !0 }; p.prototype.disable = function () { this.enabled = !1 }; p.prototype.toggleEnabled = function () {
        this.enabled =
        !this.enabled
    }; p.prototype.toggle = function (u) { var x = this; u && (x = d(u.currentTarget).data("bs." + this.type), x || (x = new this.constructor(u.currentTarget, this.getDelegateOptions()), d(u.currentTarget).data("bs." + this.type, x))); u ? (x.inState.click = !x.inState.click, x.isInStateTrue() ? x.enter(x) : x.leave(x)) : x.tip().hasClass("in") ? x.leave(x) : x.enter(x) }; p.prototype.destroy = function () {
        var u = this; clearTimeout(this.timeout); this.hide(function () {
            u.$element.off("." + u.type).removeData("bs." + u.type); u.$tip && u.$tip.detach();
            u.$tip = null; u.$arrow = null; u.$viewport = null; u.$element = null
        })
    }; p.prototype.sanitizeHtml = function (u) { return f(u, this.options.whiteList, this.options.sanitizeFn) }; var q = d.fn.tooltip; d.fn.tooltip = function (u) { return this.each(function () { var x = d(this), E = x.data("bs.tooltip"), z = "object" == typeof u && u; if (E || !/destroy|hide/.test(u)) if (E || x.data("bs.tooltip", E = new p(this, z)), "string" == typeof u) E[u]() }) }; d.fn.tooltip.Constructor = p; d.fn.tooltip.noConflict = function () { d.fn.tooltip = q; return this }
}(jQuery);
+function (d) {
    var m = function (a, e) { this.init("popover", a, e) }; if (!d.fn.tooltip) throw Error("Popover requires tooltip.js"); m.VERSION = "3.4.1"; m.DEFAULTS = d.extend({}, d.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }); m.prototype = d.extend({}, d.fn.tooltip.Constructor.prototype); m.prototype.constructor = m; m.prototype.getDefaults = function () { return m.DEFAULTS };
    m.prototype.setContent = function () {
        var a = this.tip(), e = this.getTitle(), k = this.getContent(); if (this.options.html) { var n = typeof k; this.options.sanitize && (e = this.sanitizeHtml(e), "string" === n && (k = this.sanitizeHtml(k))); a.find(".popover-title").html(e); a.find(".popover-content").children().detach().end()["string" === n ? "html" : "append"](k) } else a.find(".popover-title").text(e), a.find(".popover-content").children().detach().end().text(k); a.removeClass("fade top bottom left right in"); a.find(".popover-title").html() ||
            a.find(".popover-title").hide()
    }; m.prototype.hasContent = function () { return this.getTitle() || this.getContent() }; m.prototype.getContent = function () { var a = this.$element, e = this.options; return a.attr("data-content") || ("function" == typeof e.content ? e.content.call(a[0]) : e.content) }; m.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".arrow") }; var f = d.fn.popover; d.fn.popover = function (a) {
        return this.each(function () {
            var e = d(this), k = e.data("bs.popover"), n = "object" == typeof a && a; if (k || !/destroy|hide/.test(a)) if (k ||
                e.data("bs.popover", k = new m(this, n)), "string" == typeof a) k[a]()
        })
    }; d.fn.popover.Constructor = m; d.fn.popover.noConflict = function () { d.fn.popover = f; return this }
}(jQuery);
+function (d) {
    function m(e, k) { this.$body = d(document.body); this.$scrollElement = d(e).is(document.body) ? d(window) : d(e); this.options = d.extend({}, m.DEFAULTS, k); this.selector = (this.options.target || "") + " .nav li > a"; this.offsets = []; this.targets = []; this.activeTarget = null; this.scrollHeight = 0; this.$scrollElement.on("scroll.bs.scrollspy", d.proxy(this.process, this)); this.refresh(); this.process() } function f(e) {
        return this.each(function () {
            var k = d(this), n = k.data("bs.scrollspy"), p = "object" == typeof e && e; n || k.data("bs.scrollspy",
                n = new m(this, p)); if ("string" == typeof e) n[e]()
        })
    } m.VERSION = "3.4.1"; m.DEFAULTS = { offset: 10 }; m.prototype.getScrollHeight = function () { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }; m.prototype.refresh = function () {
        var e = this, k = "offset", n = 0; this.offsets = []; this.targets = []; this.scrollHeight = this.getScrollHeight(); d.isWindow(this.$scrollElement[0]) || (k = "position", n = this.$scrollElement.scrollTop()); this.$body.find(this.selector).map(function () {
            var p =
                d(this); p = p.data("target") || p.attr("href"); var q = /^#./.test(p) && d(p); return q && q.length && q.is(":visible") && [[q[k]().top + n, p]] || null
        }).sort(function (p, q) { return p[0] - q[0] }).each(function () { e.offsets.push(this[0]); e.targets.push(this[1]) })
    }; m.prototype.process = function () {
        var e = this.$scrollElement.scrollTop() + this.options.offset, k = this.getScrollHeight(), n = this.options.offset + k - this.$scrollElement.height(), p = this.offsets, q = this.targets, u = this.activeTarget, x; this.scrollHeight != k && this.refresh(); if (e >=
            n) return u != (x = q[q.length - 1]) && this.activate(x); if (u && e < p[0]) return this.activeTarget = null, this.clear(); for (x = p.length; x--;)u != q[x] && e >= p[x] && (void 0 === p[x + 1] || e < p[x + 1]) && this.activate(q[x])
    }; m.prototype.activate = function (e) { this.activeTarget = e; this.clear(); e = d(this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]').parents("li").addClass("active"); e.parent(".dropdown-menu").length && (e = e.closest("li.dropdown").addClass("active")); e.trigger("activate.bs.scrollspy") }; m.prototype.clear =
        function () { d(this.selector).parentsUntil(this.options.target, ".active").removeClass("active") }; var a = d.fn.scrollspy; d.fn.scrollspy = f; d.fn.scrollspy.Constructor = m; d.fn.scrollspy.noConflict = function () { d.fn.scrollspy = a; return this }; d(window).on("load.bs.scrollspy.data-api", function () { d('[data-spy="scroll"]').each(function () { var e = d(this); f.call(e, e.data()) }) })
}(jQuery);
+function (d) {
    function m(k) { return this.each(function () { var n = d(this), p = n.data("bs.tab"); p || n.data("bs.tab", p = new f(this)); if ("string" == typeof k) p[k]() }) } var f = function (k) { this.element = d(k) }; f.VERSION = "3.4.1"; f.TRANSITION_DURATION = 150; f.prototype.show = function () {
        var k = this.element, n = k.closest("ul:not(.dropdown-menu)"), p = k.data("target"); p || (p = (p = k.attr("href")) && p.replace(/.*(?=#[^\s]*$)/, "")); if (!k.parent("li").hasClass("active")) {
            var q = n.find(".active:last a"), u = d.Event("hide.bs.tab", { relatedTarget: k[0] }),
            x = d.Event("show.bs.tab", { relatedTarget: q[0] }); q.trigger(u); k.trigger(x); x.isDefaultPrevented() || u.isDefaultPrevented() || (p = d(document).find(p), this.activate(k.closest("li"), n), this.activate(p, p.parent(), function () { q.trigger({ type: "hidden.bs.tab", relatedTarget: k[0] }); k.trigger({ type: "shown.bs.tab", relatedTarget: q[0] }) }))
        }
    }; f.prototype.activate = function (k, n, p) {
        function q() {
            u.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",
                !1); k.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0); x ? (k[0].offsetWidth, k.addClass("in")) : k.removeClass("fade"); k.parent(".dropdown-menu").length && k.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0); p && p()
        } var u = n.find("> .active"), x = p && d.support.transition && (u.length && u.hasClass("fade") || !!n.find("> .fade").length); u.length && x ? u.one("bsTransitionEnd", q).emulateTransitionEnd(f.TRANSITION_DURATION) : q(); u.removeClass("in")
    };
    var a = d.fn.tab; d.fn.tab = m; d.fn.tab.Constructor = f; d.fn.tab.noConflict = function () { d.fn.tab = a; return this }; var e = function (k) { k.preventDefault(); m.call(d(this), "show") }; d(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery);
+function (d) {
    function m(e) { return this.each(function () { var k = d(this), n = k.data("bs.affix"), p = "object" == typeof e && e; n || k.data("bs.affix", n = new f(this, p)); if ("string" == typeof e) n[e]() }) } var f = function (e, k) {
        this.options = d.extend({}, f.DEFAULTS, k); this.$target = (this.options.target === f.DEFAULTS.target ? d(this.options.target) : d(document).find(this.options.target)).on("scroll.bs.affix.data-api", d.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", d.proxy(this.checkPositionWithEventLoop, this)); this.$element =
            d(e); this.pinnedOffset = this.unpin = this.affixed = null; this.checkPosition()
    }; f.VERSION = "3.4.1"; f.RESET = "affix affix-top affix-bottom"; f.DEFAULTS = { offset: 0, target: window }; f.prototype.getState = function (e, k, n, p) {
        var q = this.$target.scrollTop(), u = this.$element.offset(), x = this.$target.height(); if (null != n && "top" == this.affixed) return q < n ? "top" : !1; if ("bottom" == this.affixed) return null != n ? q + this.unpin <= u.top ? !1 : "bottom" : q + x <= e - p ? !1 : "bottom"; var E = null == this.affixed; u = E ? q : u.top; return null != n && q <= n ? "top" : null !=
            p && u + (E ? x : k) >= e - p ? "bottom" : !1
    }; f.prototype.getPinnedOffset = function () { if (this.pinnedOffset) return this.pinnedOffset; this.$element.removeClass(f.RESET).addClass("affix"); var e = this.$target.scrollTop(); return this.pinnedOffset = this.$element.offset().top - e }; f.prototype.checkPositionWithEventLoop = function () { setTimeout(d.proxy(this.checkPosition, this), 1) }; f.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), k = this.options.offset, n = k.top, p = k.bottom, q = Math.max(d(document).height(),
                d(document.body).height()); "object" != typeof k && (p = n = k); "function" == typeof n && (n = k.top(this.$element)); "function" == typeof p && (p = k.bottom(this.$element)); k = this.getState(q, e, n, p); if (this.affixed != k) {
                    null != this.unpin && this.$element.css("top", ""); n = "affix" + (k ? "-" + k : ""); var u = d.Event(n + ".bs.affix"); this.$element.trigger(u); if (u.isDefaultPrevented()) return; this.affixed = k; this.unpin = "bottom" == k ? this.getPinnedOffset() : null; this.$element.removeClass(f.RESET).addClass(n).trigger(n.replace("affix", "affixed") +
                        ".bs.affix")
                } "bottom" == k && this.$element.offset({ top: q - e - p })
        }
    }; var a = d.fn.affix; d.fn.affix = m; d.fn.affix.Constructor = f; d.fn.affix.noConflict = function () { d.fn.affix = a; return this }; d(window).on("load", function () { d('[data-spy="affix"]').each(function () { var e = d(this), k = e.data(); k.offset = k.offset || {}; null != k.offsetBottom && (k.offset.bottom = k.offsetBottom); null != k.offsetTop && (k.offset.top = k.offsetTop); m.call(e, k) }) })
}(jQuery);
(function (d) {
    d(["jquery"], function (m) {
        return function () {
            function f(z, H) { z || (z = k()); p = m("#" + z.containerId); if (p.length) return p; if (H) { var L = z; p = m("<div/>").attr("id", L.containerId).addClass(L.positionClass).attr("aria-live", "polite").attr("role", "alert"); p.appendTo(m(L.target)) } return p } function a(z, H, L) { L = L && L.force ? L.force : !1; return z && (L || 0 === m(":focus", z).length) ? (z[H.hideMethod]({ duration: H.hideDuration, easing: H.hideEasing, complete: function () { n(z) } }), !0) : !1 } function e(z) {
                function H(ea) {
                    if (!m(":focus",
                        ka).length || ea) return clearTimeout(V.intervalId), ka[N.hideMethod]({ duration: N.hideDuration, easing: N.hideEasing, complete: function () { n(ka); if (N.onHidden && "hidden" !== Fa.state) N.onHidden(); Fa.state = "hidden"; Fa.endTime = new Date; q && q(Fa) } })
                } function L() { if (0 < N.timeOut || 0 < N.extendedTimeOut) fa = setTimeout(H, N.extendedTimeOut), V.maxHideTime = parseFloat(N.extendedTimeOut), V.hideEta = (new Date).getTime() + V.maxHideTime } function D() {
                    clearTimeout(fa); V.hideEta = 0; ka.stop(!0, !0)[N.showMethod]({
                        duration: N.showDuration,
                        easing: N.showEasing
                    })
                } function M() { var ea = (V.hideEta - (new Date).getTime()) / V.maxHideTime * 100; Ka.width(ea + "%") } var N = k(), Y = z.iconClass || N.iconClass; "undefined" !== typeof z.optionsOverride && (N = m.extend(N, z.optionsOverride), Y = z.optionsOverride.iconClass || Y); a: { if (N.preventDuplicates) if (z.message === E) { var aa = !0; break a } else E = z.message; aa = !1 } if (!aa) {
                    u++; p = f(N, !0); var fa = null, ka = m("<div/>"); aa = m("<div/>"); var Na = m("<div/>"), Ka = m("<div/>"), ua = m(N.closeHtml), V = { intervalId: null, hideEta: null, maxHideTime: null },
                        Fa = { toastId: u, state: "visible", startTime: new Date, options: N, map: z }; z.iconClass && ka.addClass(N.toastClass).addClass(Y); z.title && (aa.append(z.title).addClass(N.titleClass), ka.append(aa)); z.message && (Na.append(z.message).addClass(N.messageClass), ka.append(Na)); N.closeButton && (ua.addClass("toast-close-button").attr("role", "button"), ka.prepend(ua)); N.progressBar && (Ka.addClass("toast-progress"), ka.prepend(Ka)); N.newestOnTop ? p.prepend(ka) : p.append(ka); ka.hide(); ka[N.showMethod]({
                            duration: N.showDuration, easing: N.showEasing,
                            complete: N.onShown
                        }); 0 < N.timeOut && (fa = setTimeout(H, N.timeOut), V.maxHideTime = parseFloat(N.timeOut), V.hideEta = (new Date).getTime() + V.maxHideTime, N.progressBar && (V.intervalId = setInterval(M, 10))); (function () { ka.hover(D, L); !N.onclick && N.tapToDismiss && ka.click(H); N.closeButton && ua && ua.click(function (ea) { ea.stopPropagation ? ea.stopPropagation() : void 0 !== ea.cancelBubble && !0 !== ea.cancelBubble && (ea.cancelBubble = !0); H(!0) }); N.onclick && ka.click(function () { N.onclick(); H() }) })(); q && q(Fa); N.debug && console && console.log(Fa);
                    return ka
                }
            } function k() {
                return m.extend({}, {
                    tapToDismiss: !0, toastClass: "toast", containerId: "toast-container", debug: !1, showMethod: "fadeIn", showDuration: 300, showEasing: "swing", onShown: void 0, hideMethod: "fadeOut", hideDuration: 1E3, hideEasing: "swing", onHidden: void 0, extendedTimeOut: 1E3, iconClasses: { error: "toast-error", info: "toast-info", success: "toast-success", warning: "toast-warning" }, iconClass: "toast-info", positionClass: "toast-top-right", timeOut: 5E3, titleClass: "toast-title", messageClass: "toast-message",
                    target: "body", closeHtml: '<button type="button">&times;</button>', newestOnTop: !0, preventDuplicates: !1, progressBar: !1
                }, x.options)
            } function n(z) { p || (p = f()); z.is(":visible") || (z.remove(), 0 === p.children().length && (p.remove(), E = void 0)) } var p, q, u = 0, x = {
                clear: function (z, H) { var L = k(); p || f(L); if (!a(z, L, H)) for (var D = p.children(), M = D.length - 1; 0 <= M; M--)a(m(D[M]), L) }, remove: function (z) { var H = k(); p || f(H); z && 0 === m(":focus", z).length ? n(z) : p.children().length && p.remove() }, error: function (z, H, L) {
                    return e({
                        type: "error",
                        iconClass: k().iconClasses.error, message: z, optionsOverride: L, title: H
                    })
                }, getContainer: f, info: function (z, H, L) { return e({ type: "info", iconClass: k().iconClasses.info, message: z, optionsOverride: L, title: H }) }, options: {}, subscribe: function (z) { q = z }, success: function (z, H, L) { return e({ type: "success", iconClass: k().iconClasses.success, message: z, optionsOverride: L, title: H }) }, version: "2.1.1", warning: function (z, H, L) { return e({ type: "warning", iconClass: k().iconClasses.warning, message: z, optionsOverride: L, title: H }) }
            }, E; return x
        }()
    })
})("function" ===
    typeof define && define.amd ? define : function (d, m) { "undefined" !== typeof module && module.exports ? module.exports = m(require("jquery")) : window.toastr = m(window.jQuery) });
function doResizes() {
    var d = $(document).width(); 424 <= d && 491 > d ? ($("#companyname").removeClass("fontsizedot98"), $("#companyname").removeClass("fontsizedot84"), $("#companyname").addClass("fontsize1dot3")) : 353 <= d && 424 > d ? ($("#companyname").removeClass("fontsize1dot3"), $("#companyname").removeClass("fontsizedot84"), $("#companyname").addClass("fontsizedot98")) : 353 > d ? ($("#companyname").removeClass("fontsize1dot3"), $("#companyname").removeClass("fontsizedot98"), $("#companyname").addClass("fontsizedot84")) :
        ($("#companyname").removeClass("fontsizedot84"), $("#companyname").removeClass("fontsizedot98"), $("#companyname").removeClass("fontsize1dot3"))
} $(function () { doResizes(); $(window).resize(function () { doResizes() }) });
(function (d) {
    d.flexslider = function (m, f) {
        var a = d(m); a.vars = d.extend({}, d.flexslider.defaults, f); var e = a.vars.namespace, k = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, n = ("ontouchstart" in window || k || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch, p = "", q, u = "vertical" === a.vars.direction, x = a.vars.reverse, E = 0 < a.vars.itemWidth, z = "fade" === a.vars.animation, H = "" !== a.vars.asNavFor, L = {}; d.data(m, "flexslider", a); L = {
            init: function () {
                a.animating = !1; a.currentSlide = parseInt(a.vars.startAt ?
                    a.vars.startAt : 0); isNaN(a.currentSlide) && (a.currentSlide = 0); a.animatingTo = a.currentSlide; a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last; a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" ")); a.slides = d(a.vars.selector, a); a.container = d(a.containerSelector, a); a.count = a.slides.length; a.syncExists = 0 < d(a.vars.sync).length; "slide" === a.vars.animation && (a.vars.animation = "swing"); a.prop = u ? "top" : "marginLeft"; a.args = {}; a.manualPause = !1; a.stopped = !1; a.started = !1; a.startTimeout = null; a.transitions =
                        !a.vars.video && !z && a.vars.useCSS && function () { var D = document.createElement("div"), M = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], N; for (N in M) if (void 0 !== D.style[M[N]]) return a.pfx = M[N].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0; return !1 }(); "" !== a.vars.controlsContainer && (a.controlsContainer = 0 < d(a.vars.controlsContainer).length && d(a.vars.controlsContainer)); "" !== a.vars.manualControls && (a.manualControls = 0 < d(a.vars.manualControls).length &&
                            d(a.vars.manualControls)); a.vars.randomize && (a.slides.sort(function () { return Math.round(Math.random()) - .5 }), a.container.empty().append(a.slides)); a.doMath(); a.setup("init"); a.vars.controlNav && L.controlNav.setup(); a.vars.directionNav && L.directionNav.setup(); a.vars.keyboard && (1 === d(a.containerSelector).length || a.vars.multipleKeyboard) && d(document).bind("keyup", function (D) { D = D.keyCode; a.animating || 39 !== D && 37 !== D || (D = 39 === D ? a.getTarget("next") : 37 === D ? a.getTarget("prev") : !1, a.flexAnimate(D, a.vars.pauseOnAction)) });
                a.vars.mousewheel && a.bind("mousewheel", function (D, M, N, Y) { D.preventDefault(); D = 0 > M ? a.getTarget("next") : a.getTarget("prev"); a.flexAnimate(D, a.vars.pauseOnAction) }); a.vars.pausePlay && L.pausePlay.setup(); a.vars.slideshow && a.vars.pauseInvisible && L.pauseInvisible.init(); a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function () { a.manualPlay || a.manualPause || a.pause() }, function () { a.manualPause || a.manualPlay || a.stopped || a.play() }), a.vars.pauseInvisible && L.pauseInvisible.isHidden() || (0 < a.vars.initDelay ? a.startTimeout =
                    setTimeout(a.play, a.vars.initDelay) : a.play())); H && L.asNav.setup(); n && a.vars.touch && L.touch(); (!z || z && a.vars.smoothHeight) && d(window).bind("resize orientationchange focus", L.resize); a.find("img").attr("draggable", "false"); setTimeout(function () { a.vars.start(a) }, 200)
            }, asNav: {
                setup: function () {
                    a.asNav = !0; a.animatingTo = Math.floor(a.currentSlide / a.move); a.currentItem = a.currentSlide; a.slides.removeClass(e + "active-slide").eq(a.currentItem).addClass(e + "active-slide"); k ? (m._slider = a, a.slides.each(function () {
                        this._gesture =
                        new MSGesture; this._gesture.target = this; this.addEventListener("MSPointerDown", function (D) { D.preventDefault(); D.currentTarget._gesture && D.currentTarget._gesture.addPointer(D.pointerId) }, !1); this.addEventListener("MSGestureTap", function (D) { D.preventDefault(); D = d(this); var M = D.index(); d(a.vars.asNavFor).data("flexslider").animating || D.hasClass("active") || (a.direction = a.currentItem < M ? "next" : "prev", a.flexAnimate(M, a.vars.pauseOnAction, !1, !0, !0)) })
                    })) : a.slides.click(function (D) {
                        D.preventDefault(); D = d(this);
                        var M = D.index(); 0 >= D.offset().left - d(a).scrollLeft() && D.hasClass(e + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : d(a.vars.asNavFor).data("flexslider").animating || D.hasClass(e + "active-slide") || (a.direction = a.currentItem < M ? "next" : "prev", a.flexAnimate(M, a.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () { a.manualControls ? L.controlNav.setupManual() : L.controlNav.setupPaging() }, setupPaging: function () {
                    var D = 1; a.controlNavScaffold = d('<ol class="' + e + "control-nav " + e + ("thumbnails" === a.vars.controlNav ?
                        "control-thumbs" : "control-paging") + '"></ol>'); if (1 < a.pagingCount) for (var M = 0; M < a.pagingCount; M++) { var N = a.slides.eq(M); var Y = "thumbnails" === a.vars.controlNav ? '<img src="' + N.attr("data-thumb") + '"/>' : "<a>" + D + "</a>"; "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions && (N = N.attr("data-thumbcaption"), "" != N && void 0 != N && (Y += '<span class="' + e + 'caption">' + N + "</span>")); a.controlNavScaffold.append("<li>" + Y + "</li>"); D++ } a.controlsContainer ? d(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold);
                    L.controlNav.set(); L.controlNav.active(); a.controlNavScaffold.delegate("a, img", "click touchend MSPointerUp", function (aa) { aa.preventDefault(); if ("" === p || p === aa.type) { var fa = d(this), ka = a.controlNav.index(fa); fa.hasClass(e + "active") || (a.direction = ka > a.currentSlide ? "next" : "prev", a.flexAnimate(ka, a.vars.pauseOnAction)) } "" === p && (p = aa.type); L.setToClearWatchedEvent() })
                }, setupManual: function () {
                    a.controlNav = a.manualControls; L.controlNav.active(); a.controlNav.bind("click touchend MSPointerUp", function (D) {
                        D.preventDefault();
                        if ("" === p || p === D.type) { var M = d(this), N = a.controlNav.index(M); M.hasClass(e + "active") || (N > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(N, a.vars.pauseOnAction)) } "" === p && (p = D.type); L.setToClearWatchedEvent()
                    })
                }, set: function () { a.controlNav = d("." + e + "control-nav li " + ("thumbnails" === a.vars.controlNav ? "img" : "a"), a.controlsContainer ? a.controlsContainer : a) }, active: function () { a.controlNav.removeClass(e + "active").eq(a.animatingTo).addClass(e + "active") }, update: function (D, M) {
                    1 < a.pagingCount &&
                    "add" === D ? a.controlNavScaffold.append(d("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(M).closest("li").remove(); L.controlNav.set(); 1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(M, D) : L.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var D = d('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + a.vars.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + a.vars.nextText + "</a></li></ul>"); a.controlsContainer ?
                        (d(a.controlsContainer).append(D), a.directionNav = d("." + e + "direction-nav li a", a.controlsContainer)) : (a.append(D), a.directionNav = d("." + e + "direction-nav li a", a)); L.directionNav.update(); a.directionNav.bind("click touchend MSPointerUp", function (M) { M.preventDefault(); if ("" === p || p === M.type) { var N = d(this).hasClass(e + "next") ? a.getTarget("next") : a.getTarget("prev"); a.flexAnimate(N, a.vars.pauseOnAction) } "" === p && (p = M.type); L.setToClearWatchedEvent() })
                }, update: function () {
                    var D = e + "disabled"; 1 === a.pagingCount ?
                        a.directionNav.addClass(D).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(D).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(D).filter("." + e + "prev").addClass(D).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(D).filter("." + e + "next").addClass(D).attr("tabindex", "-1") : a.directionNav.removeClass(D).removeAttr("tabindex")
                }
            }, pausePlay: {
                setup: function () {
                    var D = d('<div class="' + e + 'pauseplay"><a></a></div>'); a.controlsContainer ? (a.controlsContainer.append(D),
                        a.pausePlay = d("." + e + "pauseplay a", a.controlsContainer)) : (a.append(D), a.pausePlay = d("." + e + "pauseplay a", a)); L.pausePlay.update(a.vars.slideshow ? e + "pause" : e + "play"); a.pausePlay.bind("click touchend MSPointerUp", function (M) { M.preventDefault(); if ("" === p || p === M.type) d(this).hasClass(e + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play()); "" === p && (p = M.type); L.setToClearWatchedEvent() })
                }, update: function (D) {
                    "play" === D ? a.pausePlay.removeClass(e + "pause").addClass(e +
                        "play").html(a.vars.playText) : a.pausePlay.removeClass(e + "play").addClass(e + "pause").html(a.vars.pauseText)
                }
            }, touch: function () {
                var D, M, N, Y, aa, fa, ka = !1, Na = 0, Ka = 0, ua = 0; if (k) m.style.msTouchAction = "none", m._gesture = new MSGesture, m._gesture.target = m, m.addEventListener("MSPointerDown", function (ea) {
                    ea.stopPropagation(); a.animating ? ea.preventDefault() : (a.pause(), m._gesture.addPointer(ea.pointerId), ua = 0, Y = u ? a.h : a.w, fa = Number(new Date), N = E && x && a.animatingTo === a.last ? 0 : E && x ? a.limit - (a.itemW + a.vars.itemMargin) *
                        a.move * a.animatingTo : E && a.currentSlide === a.last ? a.limit : E ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : x ? (a.last - a.currentSlide + a.cloneOffset) * Y : (a.currentSlide + a.cloneOffset) * Y)
                }, !1), m._slider = a, m.addEventListener("MSGestureChange", function (ea) {
                    ea.stopPropagation(); var Da = ea.target._slider; if (Da) {
                        var Wa = -ea.translationX, G = -ea.translationY; aa = ua += u ? G : Wa; ka = u ? Math.abs(ua) < Math.abs(-Wa) : Math.abs(ua) < Math.abs(-G); if (ea.detail === ea.MSGESTURE_FLAG_INERTIA) setImmediate(function () { m._gesture.stop() });
                        else if (!ka || 500 < Number(new Date) - fa) ea.preventDefault(), !z && Da.transitions && (Da.vars.animationLoop || (aa = ua / (0 === Da.currentSlide && 0 > ua || Da.currentSlide === Da.last && 0 < ua ? Math.abs(ua) / Y + 2 : 1)), Da.setProps(N + aa, "setTouch"))
                    }
                }, !1), m.addEventListener("MSGestureEnd", function (ea) {
                    ea.stopPropagation(); if (ea = ea.target._slider) {
                        if (ea.animatingTo === ea.currentSlide && !ka && null !== aa) {
                            var Da = x ? -aa : aa, Wa = 0 < Da ? ea.getTarget("next") : ea.getTarget("prev"); ea.canAdvance(Wa) && (550 > Number(new Date) - fa && 50 < Math.abs(Da) || Math.abs(Da) >
                                Y / 2) ? ea.flexAnimate(Wa, ea.vars.pauseOnAction) : z || ea.flexAnimate(ea.currentSlide, ea.vars.pauseOnAction, !0)
                        } N = aa = M = D = null; ua = 0
                    }
                }, !1); else {
                    var V = function (ea) {
                        m.removeEventListener("touchmove", Fa, !1); if (a.animatingTo === a.currentSlide && !ka && null !== aa) { ea = x ? -aa : aa; var Da = 0 < ea ? a.getTarget("next") : a.getTarget("prev"); a.canAdvance(Da) && (550 > Number(new Date) - fa && 50 < Math.abs(ea) || Math.abs(ea) > Y / 2) ? a.flexAnimate(Da, a.vars.pauseOnAction) : z || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0) } m.removeEventListener("touchend",
                            V, !1); N = aa = M = D = null
                    }, Fa = function (ea) { Na = ea.touches[0].pageX; Ka = ea.touches[0].pageY; aa = u ? D - Ka : D - Na; ka = u ? Math.abs(aa) < Math.abs(Na - M) : Math.abs(aa) < Math.abs(Ka - M); if (!ka || 500 < Number(new Date) - fa) ea.preventDefault(), !z && a.transitions && (a.vars.animationLoop || (aa /= 0 === a.currentSlide && 0 > aa || a.currentSlide === a.last && 0 < aa ? Math.abs(aa) / Y + 2 : 1), a.setProps(N + aa, "setTouch")) }; m.addEventListener("touchstart", function (ea) {
                        if (a.animating) ea.preventDefault(); else if (window.navigator.msPointerEnabled || 1 === ea.touches.length) a.pause(),
                            Y = u ? a.h : a.w, fa = Number(new Date), Na = ea.touches[0].pageX, Ka = ea.touches[0].pageY, N = E && x && a.animatingTo === a.last ? 0 : E && x ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : E && a.currentSlide === a.last ? a.limit : E ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : x ? (a.last - a.currentSlide + a.cloneOffset) * Y : (a.currentSlide + a.cloneOffset) * Y, D = u ? Ka : Na, M = u ? Na : Ka, m.addEventListener("touchmove", Fa, !1), m.addEventListener("touchend", V, !1)
                    }, !1)
                }
            }, resize: function () {
                !a.animating && a.is(":visible") && (E || a.doMath(),
                    z ? L.smoothHeight() : E ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : u ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (a.vars.smoothHeight && L.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            }, smoothHeight: function (D) { if (!u || z) { var M = z ? a : a.viewport; D ? M.animate({ height: a.slides.eq(a.animatingTo).height() }, D) : M.height(a.slides.eq(a.animatingTo).height()) } }, sync: function (D) {
                var M = d(a.vars.sync).data("flexslider"), N = a.animatingTo; switch (D) {
                    case "animate": M.flexAnimate(N,
                        a.vars.pauseOnAction, !1, !0); break; case "play": M.playing || M.asNav || M.play(); break; case "pause": M.pause()
                }
            }, pauseInvisible: {
                visProp: null, init: function () {
                    var D = ["webkit", "moz", "ms", "o"]; if ("hidden" in document) return "hidden"; for (var M = 0; M < D.length; M++)D[M] + "Hidden" in document && (L.pauseInvisible.visProp = D[M] + "Hidden"); L.pauseInvisible.visProp && (D = L.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(D, function () {
                        L.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) :
                            a.pause() : a.started ? a.play() : 0 < a.vars.initDelay ? setTimeout(a.play, a.vars.initDelay) : a.play()
                    }))
                }, isHidden: function () { return document[L.pauseInvisible.visProp] || !1 }
            }, setToClearWatchedEvent: function () { clearTimeout(q); q = setTimeout(function () { p = "" }, 3E3) }
        }; a.flexAnimate = function (D, M, N, Y, aa) {
            a.vars.animationLoop || D === a.currentSlide || (a.direction = D > a.currentSlide ? "next" : "prev"); H && 1 === a.pagingCount && (a.direction = a.currentItem < D ? "next" : "prev"); if (!a.animating && (a.canAdvance(D, aa) || N) && a.is(":visible")) {
                if (H &&
                    Y) if (N = d(a.vars.asNavFor).data("flexslider"), a.atEnd = 0 === D || D === a.count - 1, N.flexAnimate(D, !0, !1, !0, aa), a.direction = a.currentItem < D ? "next" : "prev", N.direction = a.direction, Math.ceil((D + 1) / a.visible) - 1 !== a.currentSlide && 0 !== D) a.currentItem = D, a.slides.removeClass(e + "active-slide").eq(D).addClass(e + "active-slide"), D = Math.floor(D / a.visible); else return a.currentItem = D, a.slides.removeClass(e + "active-slide").eq(D).addClass(e + "active-slide"), !1; a.animating = !0; a.animatingTo = D; M && a.pause(); a.vars.before(a); a.syncExists &&
                        !aa && L.sync("animate"); a.vars.controlNav && L.controlNav.active(); E || a.slides.removeClass(e + "active-slide").eq(D).addClass(e + "active-slide"); a.atEnd = 0 === D || D === a.last; a.vars.directionNav && L.directionNav.update(); D === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()); if (z) n ? (a.slides.eq(a.currentSlide).css({ opacity: 0, zIndex: 1 }), a.slides.eq(D).css({ opacity: 1, zIndex: 2 }), a.wrapup(fa)) : (a.slides.eq(a.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, a.vars.animationSpeed, a.vars.easing), a.slides.eq(D).css({ zIndex: 2 }).animate({ opacity: 1 },
                            a.vars.animationSpeed, a.vars.easing, a.wrapup)); else {
                                var fa = u ? a.slides.filter(":first").height() : a.computedW; E ? (D = a.vars.itemMargin, D = (a.itemW + D) * a.move * a.animatingTo, D = D > a.limit && 1 !== a.visible ? a.limit : D) : D = 0 === a.currentSlide && D === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? x ? (a.count + a.cloneOffset) * fa : 0 : a.currentSlide === a.last && 0 === D && a.vars.animationLoop && "prev" !== a.direction ? x ? 0 : (a.count + 1) * fa : x ? (a.count - 1 - D + a.cloneOffset) * fa : (D + a.cloneOffset) * fa; a.setProps(D, "", a.vars.animationSpeed);
                    a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function () { a.wrapup(fa) })) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function () { a.wrapup(fa) })
                } a.vars.smoothHeight && L.smoothHeight(a.vars.animationSpeed)
            }
        }; a.wrapup = function (D) {
            z || E || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(D, "jumpEnd") : a.currentSlide ===
                a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(D, "jumpStart")); a.animating = !1; a.currentSlide = a.animatingTo; a.vars.after(a)
        }; a.animateSlides = function () { a.animating || a.flexAnimate(a.getTarget("next")) }; a.pause = function () { clearInterval(a.animatedSlides); a.animatedSlides = null; a.playing = !1; a.vars.pausePlay && L.pausePlay.update("play"); a.syncExists && L.sync("pause") }; a.play = function () {
            a.playing && clearInterval(a.animatedSlides); a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed);
            a.started = a.playing = !0; a.vars.pausePlay && L.pausePlay.update("pause"); a.syncExists && L.sync("play")
        }; a.stop = function () { a.pause(); a.stopped = !0 }; a.canAdvance = function (D, M) {
            var N = H ? a.pagingCount - 1 : a.last; return M ? !0 : H && a.currentItem === a.count - 1 && 0 === D && "prev" === a.direction ? !0 : H && 0 === a.currentItem && D === a.pagingCount - 1 && "next" !== a.direction ? !1 : D !== a.currentSlide || H ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && D === N && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === N && 0 === D && "next" === a.direction ?
                !1 : !0 : !1
        }; a.getTarget = function (D) { a.direction = D; return "next" === D ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1 }; a.setProps = function (D, M, N) {
            var Y = function () {
                var aa = D ? D : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo; return -1 * function () {
                    if (E) return "setTouch" === M ? D : x && a.animatingTo === a.last ? 0 : x ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : aa; switch (M) {
                        case "setTotal": return x ? (a.count - 1 - a.currentSlide + a.cloneOffset) *
                            D : (a.currentSlide + a.cloneOffset) * D; case "setTouch": return D; case "jumpEnd": return x ? D : a.count * D; case "jumpStart": return x ? a.count * D : D; default: return D
                    }
                }() + "px"
            }(); a.transitions && (Y = u ? "translate3d(0," + Y + ",0)" : "translate3d(" + Y + ",0,0)", N = void 0 !== N ? N / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", N)); a.args[a.prop] = Y; (a.transitions || void 0 === N) && a.container.css(a.args)
        }; a.setup = function (D) {
            if (z) a.slides.css({ width: "100%", "float": "left", marginRight: "-100%", position: "relative" }), "init" ===
                D && (n ? a.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + a.vars.animationSpeed / 1E3 + "s ease", zIndex: 1 }).eq(a.currentSlide).css({ opacity: 1, zIndex: 2 }) : a.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(a.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && L.smoothHeight(); else {
                    if ("init" === D && (a.viewport = d('<div class="' + e + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(a).append(a.container), a.cloneCount =
                        0, a.cloneOffset = 0, x)) { var M = d.makeArray(a.slides).reverse(); a.slides = d(M); a.container.empty().append(a.slides) } a.vars.animationLoop && !E && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== D && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(a.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))); a.newSlides = d(a.vars.selector, a); var N = x ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset; u && !E ?
                            (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () { a.newSlides.css({ display: "block" }); a.doMath(); a.viewport.height(a.h); a.setProps(N * a.h, "init") }, "init" === D ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(N * a.computedW, "init"), setTimeout(function () { a.doMath(); a.newSlides.css({ width: a.computedW, "float": "left", display: "block" }); a.vars.smoothHeight && L.smoothHeight() }, "init" === D ? 100 : 0))
            } E || a.slides.removeClass(e + "active-slide").eq(a.currentSlide).addClass(e +
                "active-slide")
        }; a.doMath = function () {
            var D = a.slides.first(), M = a.vars.itemMargin, N = a.vars.minItems, Y = a.vars.maxItems; a.w = void 0 === a.viewport ? a.width() : a.viewport.width(); a.h = D.height(); a.boxPadding = D.outerWidth() - D.width(); E ? (a.itemT = a.vars.itemWidth + M, a.minW = N ? N * a.itemT : a.w, a.maxW = Y ? Y * a.itemT - M : a.w, a.itemW = a.minW > a.w ? (a.w - M * (N - 1)) / N : a.maxW < a.w ? (a.w - M * (Y - 1)) / Y : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = 0 < a.vars.move && a.vars.move < a.visible ? a.vars.move : a.visible,
                a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + M * (a.count - 1) : (a.itemW + M) * a.count - a.w - M) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1); a.computedW = a.itemW - a.boxPadding
        }; a.update = function (D, M) {
            a.doMath(); E || (D < a.currentSlide ? a.currentSlide += 1 : D <= a.currentSlide && 0 !== D && --a.currentSlide, a.animatingTo = a.currentSlide); if (a.vars.controlNav && !a.manualControls) if ("add" === M && !E || a.pagingCount > a.controlNav.length) L.controlNav.update("add");
            else if ("remove" === M && !E || a.pagingCount < a.controlNav.length) E && a.currentSlide > a.last && (--a.currentSlide, --a.animatingTo), L.controlNav.update("remove", a.last); a.vars.directionNav && L.directionNav.update()
        }; a.addSlide = function (D, M) { var N = d(D); a.count += 1; a.last = a.count - 1; u && x ? void 0 !== M ? a.slides.eq(a.count - M).after(N) : a.container.prepend(N) : void 0 !== M ? a.slides.eq(M).before(N) : a.container.append(N); a.update(M, "add"); a.slides = d(a.vars.selector + ":not(.clone)", a); a.setup(); a.vars.added(a) }; a.removeSlide =
            function (D) { var M = isNaN(D) ? a.slides.index(d(D)) : D; --a.count; a.last = a.count - 1; isNaN(D) ? d(D, a.slides).remove() : u && x ? a.slides.eq(a.last).remove() : a.slides.eq(D).remove(); a.doMath(); a.update(M, "remove"); a.slides = d(a.vars.selector + ":not(.clone)", a); a.setup(); a.vars.removed(a) }; L.init()
    }; d(window).blur(function (m) { focused = !1 }).focus(function (m) { focused = !0 }); d.flexslider.defaults = {
        namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0,
        smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7E3, animationSpeed: 600, initDelay: 0, randomize: !1, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function () { },
        before: function () { }, after: function () { }, end: function () { }, added: function () { }, removed: function () { }
    }; d.fn.flexslider = function (m) {
        void 0 === m && (m = {}); if ("object" === typeof m) return this.each(function () { var a = d(this), e = a.find(m.selector ? m.selector : ".slides > li"); 1 === e.length && !0 === m.allowOneSlide || 0 === e.length ? (e.fadeIn(400), m.start && m.start(a)) : void 0 === a.data("flexslider") && new d.flexslider(this, m) }); var f = d(this).data("flexslider"); switch (m) {
            case "play": f.play(); break; case "pause": f.pause(); break; case "stop": f.stop();
                break; case "next": f.flexAnimate(f.getTarget("next"), !0); break; case "prev": case "previous": f.flexAnimate(f.getTarget("prev"), !0); break; default: "number" === typeof m && f.flexAnimate(m, !0)
        }
    }
})(jQuery);
(function (d) {
    d.fn.lightbox = function (m) {
        var f = { margin: 50, nav: !0, blur: !0, minSize: 0 }, a = {
            items: [], lightbox: null, image: null, current: null, locked: !1, caption: null, init: function (e) {
                a.items = e; a.selector = "lightbox-" + Math.random().toString().replace(".", ""); a.lightbox || (d("body").append('<div id="lightbox" style="display:none;"><a href="#" class="lightbox-close lightbox-button"></a><div class="lightbox-nav"><a href="#" class="lightbox-previous lightbox-button"></a><a href="#" class="lightbox-next lightbox-button"></a></div><div href="#" class="lightbox-caption"><p></p></div></div>'), a.lightbox =
                    d("#lightbox"), a.caption = d(".lightbox-caption", a.lightbox)); 1 < a.items.length && f.nav ? d(".lightbox-nav", a.lightbox).show() : d(".lightbox-nav", a.lightbox).hide(); a.bindEvents()
            }, loadImage: function () {
                f.blur && d("body").addClass("blurred"); d("img", a.lightbox).remove(); a.lightbox.fadeIn("fast").append('<span class="lightbox-loading"></span>'); var e = d('<img src="' + d(a.current).attr("href") + '" draggable="false">'); d(e).load(function () {
                    d(".lightbox-loading").remove(); a.lightbox.append(e); a.image = d("img", a.lightbox).hide();
                    a.resizeImage(); a.setCaption()
                })
            }, setCaption: function () { var e = d(a.current).data("caption"); e && 0 < e.length ? (a.caption.fadeIn(), d("p", a.caption).text(e)) : a.caption.hide() }, resizeImage: function () {
                var e = d(window).height() - f.margin; var k = d(window).outerWidth(!0) - f.margin; a.image.width("").height(""); var n = a.image.height(); var p = a.image.width(); if (p > k) { var q = k / p; p = k; n = Math.round(n * q) } n > e && (q = e / n, n = e, p = Math.round(p * q)); a.image.width(p).height(n).css({
                    top: (d(window).height() - a.image.outerHeight()) / 2 + "px",
                    left: (d(window).width() - a.image.outerWidth()) / 2 + "px"
                }).show(); a.locked = !1
            }, getCurrentIndex: function () { return d.inArray(a.current, a.items) }, next: function () { if (a.locked) return !1; a.locked = !0; a.getCurrentIndex() >= a.items.length - 1 ? d(a.items[0]).click() : d(a.items[a.getCurrentIndex() + 1]).click() }, previous: function () { if (a.locked) return !1; a.locked = !0; 0 >= a.getCurrentIndex() ? d(a.items[a.items.length - 1]).click() : d(a.items[a.getCurrentIndex() - 1]).click() }, bindEvents: function () {
                d(a.items).click(function (e) {
                    if (!d("#lightbox").is(":visible") &&
                        (d(window).width() < f.minSize || d(window).height() < f.minSize)) d(this).attr("target", "_blank"); else { var k = d(this)[0]; e.preventDefault(); a.current = k; a.loadImage(); d(document).on("keydown", function (n) { 27 === n.keyCode && a.close(); 39 === n.keyCode && a.next(); 37 === n.keyCode && a.previous() }) }
                }); a.lightbox.on("click", function (e) { this === e.target && a.close() }); d(a.lightbox).on("click", ".lightbox-previous", function () { a.previous(); return !1 }); d(a.lightbox).on("click", ".lightbox-next", function () { a.next(); return !1 }); d(a.lightbox).on("click",
                    ".lightbox-close", function () { a.close(); return !1 }); d(window).resize(function () { a.image && a.resizeImage() })
            }, close: function () { d(document).off("keydown"); d(a.lightbox).fadeOut("fast"); d("body").removeClass("blurred") }
        }; d.extend(f, m); a.init(this)
    }
})(jQuery);
$(function () {
    var d, m = $(".menu-first").find("a"), f = m.map(function () { if (!$(this).hasClass("external")) { var a = $($(this).attr("href")); if (a.length) return a } }); m.click(function (a) { var e = $(this).attr("href"); e = "#" === e ? 0 : $(e).offset().top - 50 + 1; $("html, body").stop().animate({ scrollTop: e }, 500); a.preventDefault() }); $(window).scroll(function () {
        var a = $(this).scrollTop() + 50, e = f.map(function () { if ($(this).offset().top < a) return this }); e = (e = e[e.length - 1]) && e.length ? e[0].id : ""; d !== e && (d = e, m.parent().removeClass("active").end().filter("[href=#" +
            e + "]").parent().addClass("active"))
    }); $(window).scroll(function () { $(".main-header").toggleClass("scrolled", 1 < $(this).scrollTop()) }); $('a[href="#top"]').click(function () { $("html, body").animate({ scrollTop: 0 }, "slow"); return !1 }); $(".flexslider").flexslider({ slideshow: !0, animation: "fade", animationLoop: !0, slideshowSpeed: 6E3, directionNav: !1, start: function (a) { $("img.lazy").slice(0, 3).each(function () { var e = $(this).attr("data-srca"); $(this).attr("src", e).removeAttr("data-srca").removeClass("lazy"); $(this).removeClass("flexslider-img") }) } });
    $(".toggle-menu").click(function () { $(".menu-first").toggleClass("show") }); $(".menu-first li a").click(function () { $(".menu-first").removeClass("show") }); $(function () { $('[data-rel="lightbox"]').lightbox() })
});
$(function () {
    tns({ container: ".my-slider", mode: "carousel", lazyload: !0, items: 1, slideBy: 1, rewind: !0, autoplay: !1, loop: !1, speed: 750, autoplayButtonOutput: !1, autoplayHoverPause: !0, axis: "horizontal", touch: !0, mouseDrag: !0, swipeAngle: 60, controls: !0, controlsContainer: "#customize-controls", nav: !1, responsive: { 541: { items: 2 }, 768: { items: 3 } } }); $("body").bind("touchstart", function () { }); $(".lazy").lazy({
        delay: 0, threshold: 500, scrollDirection: "both", effect: "fadeIn", effectTime: 0, visibleOnly: !1, onError: function (d) {
            console.log("error loading " +
                d.data("src"))
        }
    }); $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
        preventSubmit: !0, submitSuccess: function (d, m) {
            m.preventDefault(); $this = $("#sendMessageButton"); $this.prop("disabled", !0); var f = { name: $("#name").val(), preferredmethod: $("#preferredmethod").val(), phone: $("#phone").val(), email: $("#email").val(), message: $("#message").val() }; $.ajax({
                type: "POST", url: "/Home/Send", data: f, success: function (a) {
                    "OK" == a ? ($("#success").html("<div class='alert alert-success'><strong>Your message has been sent.</strong></div>"),
                        $("#contactForm").trigger("reset"), toastr.success("Message received!  We will contact you as soon as possible.")) : ($("#success").html("<div class='alert alert-danger'>There is an error.</div>"), toastr.error("Message not sent.  Please try again later."))
                }, error: function (a) { $("#success").html("<div class='alert alert-danger'>There is an error.</div>"); toastr.error("Message not sent.  Please try again later.") }, complete: function () {
                    setTimeout(function () { $this.prop("disabled", !1); $("#success").html("") },
                        5E3)
                }
            })
        }
    })
});