var vui = vui || {};

vui.jasmine = vui.jasmine || {};
vui.jasmine.dom = vui.jasmine.dom || {};

vui.jasmine.dom._private = {

	createCompareBoxValues: function( propertyPrefix, propertySuffix ) {
		return {
			compare: function( actual, expected ) {

				propertyPrefix = propertyPrefix ? propertyPrefix + "-" : "";
				propertySuffix = propertySuffix ? "-" + propertySuffix : "";

				var topResult = vui.jasmine.dom._private.createCompareStyle(
						propertyPrefix + 'top' + propertySuffix
					).compare( actual, expected );

				if ( !topResult.pass ) {
					return topResult;
				}

				var rightResult = vui.jasmine.dom._private.createCompareStyle(
						propertyPrefix + 'right' + propertySuffix
					).compare( actual, expected );

				if ( !rightResult.pass ) {
					return rightResult;
				}

				var bottomResult = vui.jasmine.dom._private.createCompareStyle(
						propertyPrefix + 'bottom' + propertySuffix
					).compare( actual, expected );

				if ( !bottomResult.pass ) {
					return bottomResult;
				}

				var leftResult = vui.jasmine.dom._private.createCompareStyle(
						propertyPrefix + 'left' + propertySuffix
					).compare( actual, expected );

				if ( !leftResult.pass ) {
					return leftResult;
				}

				return { pass: true };

			}
		};

	},

	createCompareStyle: function( property, pseudoElement, compareType ) {

		if ( pseudoElement === undefined ) {
			pseudoElement = null;
		}

		if ( compareType === undefined ) {
			compareType = 'equals';
		}

		return {
			compare: function( node, expected ) {

				if ( !node ) {
					return { pass: false, message: 'The node value is not defined.' };
				}
				if ( !expected ) {
					return { pass: false, message: 'The expected value is not defined.' };
				}

				var val = window.getComputedStyle( node, pseudoElement ).getPropertyValue( property );
				if ( compareType === 'equals' && val === expected ) {
					return { pass: true };
				} else if ( compareType === 'startsWith' && val.indexOf( expected ) !== -1 ) {
					return { pass: true };
				} else {
					return {
						pass: false,
						message: 'Expected ' + property + ' to be ' + expected + ' but found ' + val + '.'
					};
				}

			}
		};
	},

	extractBrowser: function( userAgent, expected ) {

		var result;

		if( userAgent.indexOf("Chrome") > -1 ) {
			result = expected.Chrome;
		} else if( userAgent.indexOf("Safari") > -1 ) {
			result = expected.Safari;
		} else if( userAgent.indexOf("Opera") > -1 ) {
			result = expected.Opera;
		} else if( userAgent.indexOf("Firefox") > -1 ) {
			result = expected.Firefox;
		} else if( userAgent.indexOf("MSIE") > -1 ) {
			result = expected.MSIE;
		}

		if( result === undefined ) {
			result = expected.default;
		}

		return result;
	}

};

vui.jasmine.dom.matchers = {

	toHaveAfterElementContent: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'content', ':after' );
	},

	toHaveAfterElementBase64Image: function() {
		return {
			compare: function( actual ) {
				var compareObj = vui.jasmine.dom._private.createCompareStyle(
					'content',
					':after',
					'startsWith'
				);
				return compareObj.compare( actual, 'url(data:image/png;base64,' );
			}
		};
	},

	toHaveAfterElementDisplay: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'display', ':after' );
	},

	toHaveBackgroundColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'background-color' );
	},

	toHaveBackgroundPosition: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'background-position' );
	},

	toHaveBackgroundRepeat: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'background-repeat' );
	},

	toHaveBase64BackgroundImage: function() {
		return {
			compare: function( actual ) {
				var compareObj = vui.jasmine.dom._private.createCompareStyle(
					'background-image',
					null,
					'startsWith'
				);
				return compareObj.compare( actual, 'url(data:image/png;base64,' );
			}
		};
	},

	toHaveBeforeElementContent: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'content', ':before' );
	},

	toHaveBeforeElementBase64Image: function() {
		return {
			compare: function( actual ) {
				var compareObj = vui.jasmine.dom._private.createCompareStyle(
					'content',
					':before',
					'startsWith'
				);
				return compareObj.compare( actual, 'url(data:image/png;base64,' );
			}
		};
	},

	toHaveBeforeElementDisplay: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'display', ':before' );
	},

	toHaveBorder: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'border' );
	},

	toHaveBorderStyle: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'border', 'style' );
	},

	toHaveBorderWidth: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'border', 'width' );
	},

	toHaveBorderColor: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'border', 'color' );
	},

	toHaveBorderRadius: function() {
		return {
			compare: function( actual, expected ) {

				var topRightResult = vui.jasmine.dom._private.createCompareStyle( 'border-top-right-radius' )
					.compare( actual, expected );

				if ( !topRightResult.pass ) {
					return topRightResult;
				}

				var bottomRightResult = vui.jasmine.dom._private.createCompareStyle( 'border-bottom-right-radius' )
					.compare( actual, expected );

				if ( !bottomRightResult.pass ) {
					return bottomRightResult;
				}

				var bottomLeftResult = vui.jasmine.dom._private.createCompareStyle( 'border-bottom-left-radius' )
					.compare( actual, expected );

				if ( !bottomLeftResult.pass ) {
					return bottomLeftResult;
				}

				var topLeftResult = vui.jasmine.dom._private.createCompareStyle( 'border-top-left-radius' )
					.compare( actual, expected );

				if ( !topLeftResult.pass ) {
					return topLeftResult;
				}

				return { pass: true };

			}
		};
	},

	toHaveBottomBorderColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-bottom-color' );
	},

	toHaveBottomBorderStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-bottom-style' );
	},

	toHaveBottomBorderWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-bottom-width' );
	},

	toHaveBottomLeftBorderRadius: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-bottom-left-radius' );
	},

	toHaveBottomMargin: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'margin-bottom' );
	},

	toHaveBottomPadding: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'padding-bottom' );
	},

	toHaveBottomRightBorderRadius: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-bottom-right-radius' );
	},

	toHaveBoxShadow: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'box-shadow' );
	},

	toHaveClassName: function() {
		return {
			compare: function( actualElement, expectedClass ) {

				var hasClass = ( " " + actualElement.className + " " )
					.indexOf( " "+expectedClass+" " ) > -1;

				return {
					pass: hasClass,
					message: 'Expected element to have class "' + expectedClass + '"" but it did not.'
				};

			}
		};
	},

	toHaveColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'color' );
	},

	toHaveCssSelector: function() {
		return {
			compare: function( actualDocument, expectedSelector ) {

				if ( !actualDocument ) {
					return {
						pass: false,
						message: 'The actualDocument value is not defined.'
					};
				}
				if ( !expectedSelector ) {
					return {
						pass: false,
						message: 'The expectedSelector value is not defined.'
					};
				}

				for ( var i=0; i<actualDocument.styleSheets.length; ++i ) {
					for ( var j=0; j<actualDocument.styleSheets[i].cssRules.length; ++j ) {
						var selectorText = actualDocument.styleSheets[i].cssRules[j].selectorText;
						if ( selectorText !== undefined ) {
							var selectors = selectorText.split( ',' );
							for ( var k=0; k<selectors.length; k++ ) {
								if ( selectors[k].replace( /(^\s+|\s+$)/g,'' ) === expectedSelector ) {
									return { pass: true };
								}
							}
						}
					}
				}

				return {
					pass: false,
					message: 'Expected to find ' + expectedSelector + ' css selector but did not.'
				};

			}
		};
	},

	toHaveCursor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'cursor' );
	},

	toHaveDisplay: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'display' );
	},

	toHaveFontFamily: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'font-family' );
	},

	toHaveFontSize: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'font-size' );
	},

	toHaveFontStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'font-style' );
	},

	toHaveFontWeight: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'font-weight' );
	},

	toHaveHeight: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'height' );
	},

	toHaveLeftBorderColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-left-color' );
	},

	toHaveLeftBorderStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-left-style' );
	},

	toHaveLeftBorderWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-left-width' );
	},

	toHaveLeftMargin: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'margin-left' );
	},

	toHaveLeftPadding: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'padding-left' );
	},

	toHaveLineHeight: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'line-height' );
	},

	toHaveListStyleImage: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'list-style-image' );
	},

	toHaveListStylePosition: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'list-style-position' );
	},

	toHaveListStyleType: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'list-style-type' );
	},

	toHaveMargin: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'margin' );
	},

	toHaveMaxHeight: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'max-height' );
	},

	toHaveMaxWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'max-width' );
	},

	toHaveMinHeight: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'min-height' );
	},

	toHaveMinWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'min-width' );
	},

	toHaveOutlineColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'outline-color' );
	},

	toHaveOutlineStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'outline-style' );
	},

	toHaveOutlineWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'outline-width' );
	},

	toHaveOverflow: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'overflow' );
	},

	toHavePadding: function() {
		return vui.jasmine.dom._private.createCompareBoxValues( 'padding' );
	},

	toHaveRightBorderColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-right-color' );
	},

	toHaveRightBorderStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-right-style' );
	},

	toHaveRightBorderWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-right-width' );
	},

	toHaveRightMargin: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'margin-right' );
	},

	toHaveTextAlign: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'text-align' );
	},

	toHaveRightPadding: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'padding-right' );
	},

	toHaveTextDecoration: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'text-decoration' );
	},

	toHaveTopBorderColor: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-top-color' );
	},

	toHaveTopBorderStyle: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-top-style' );
	},

	toHaveTopBorderWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-top-width' );
	},

	toHaveTopLeftBorderRadius: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-top-left-radius' );
	},

	toHaveTopMargin: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'margin-top' );
	},

	toHaveTopPadding: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'padding-top' );
	},

	toHaveTopRightBorderRadius: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'border-top-right-radius' );
	},

	toHaveWidth: function() {
		return vui.jasmine.dom._private.createCompareStyle( 'width' );
	},

	toBeOnBrowser: function( ) {
		return {
			compare: function( actual, browserExpected ) {

				var expected = vui.jasmine.dom._private.extractBrowser(
						navigator.userAgent,
						browserExpected
					);

				return {
						pass: actual == expected,
						message: 'Expected ' + actual + ' to be ' + expected
					};

			}
		};
	},

	toBeOnAgent: function() {
		return {
			compare: function( actual, agentExpected ) {
				var userAgent = navigator.userAgent;

				var expected = vui.jasmine.dom._private.extractBrowser(
						userAgent,
						agentExpected
					);

				var osExpected;
				if( userAgent.indexOf("Windows") > -1 ) {
					osExpected = expected.Windows;
				} else if( userAgent.indexOf("Linux") > -1 ) {
					osExpected = expected.Linux;
				}

				if( osExpected === undefined ) {
					osExpected = expected.default;
				}

				return {
					pass: actual === osExpected,
					message: 'Expected ' + actual + ' to be ' + osExpected
				};

			}
		};
	}

};

vui.jasmine.dom.differs = {
	_private: {
		createDeclassedClone: function( classedElement ) {
			if( classedElement == document.body ) {
				return classedElement;
			}

			var element = classedElement.cloneNode( false );
			element.className="";
			var parent = vui.jasmine.dom.differs._private.createDeclassedClone( classedElement.parentNode )
				.appendChild( element );

			return element;
		},

		removeDeclassedClone: function( declassedElement ) {
		    if( declassedElement == document.body ) {
		        return;
		    }

		    var parentNode = declassedElement.parentNode;
		    parentNode.removeChild( declassedElement );
		    vui.jasmine.dom.differs._private.removeDeclassedClone( parentNode );
		},

		getStyleDeclarationDiff: function( cssStyleDeclarationA, cssStyleDeclarationB ) {
			var diff = {};

			for (var i = 0; i < cssStyleDeclarationA.length; i++) {
				var aName = cssStyleDeclarationA.item(i);

				var actualValue = cssStyleDeclarationA.getPropertyValue(aName);
				var defaultValue = cssStyleDeclarationB.getPropertyValue(aName);

				if ( actualValue === defaultValue ) {
					continue;
				}

				diff[aName] = actualValue;
			}

			return diff;
		}
	},

	diffDefaultStyle: function( classStyledElement ) {
		var defaultElement = vui.jasmine.dom.differs._private.createDeclassedClone( classStyledElement );

		var actualComputed = window.getComputedStyle( classStyledElement );

		var defaultComputed = window.getComputedStyle( defaultElement );

		if ( !actualComputed || !defaultComputed ) {
			vui.jasmine.dom.differs._private.removeDeclassedClone( defaultElement );
			return null;
		}

		var diff = vui.jasmine.dom.differs._private.getStyleDeclarationDiff( actualComputed, defaultComputed );

		vui.jasmine.dom.differs._private.removeDeclassedClone( defaultElement );

		return diff;
	},

	isUserAgentOS: function( os ) {
		return navigator.userAgent.indexOf( os ) != -1;
	}

};
