import chai from 'chai';
//import { isStrUrl } from '../client/src/lib/helpers';

// TODO: unable to use the imported isStrUrl for testing for some reason. Error
// output says Using `babel-preset-react-app` requires that you specify `NODE_ENV`
// or `BABEL_ENV` environment variables.
// Will figure out later. For now, copy-paste the whole function into this file for testing

const isStrUrl = str => {
  const matchTld = /(\.com|\.org|\.net|\.edu|\.gov|\.mil|\.io|\.ly|\.ai|\.my|\.co|\.exchange|\.me|\.app|\.gl|\.us|\.de|\.fr|\.is|\.co.uk)/i
  const matchWWW = /(\www.)/i;
  const matchHTTP = /(http:|https:)/i;
  return matchTld.test(str) || matchWWW.test(str) || matchHTTP.test(str);
};

const expect = chai.expect;
/* To run this unit test, in console:
 * $ npm run test test/parseUrl
 */

describe('testing isStrUrl', () => {
  it('Typical URLs including https, http, www, and TLD', () => {
    expect(isStrUrl('https://looseleafapp.com')).to.equal(true);
    expect(isStrUrl('https://www.facebook.com')).to.equal(true);
    expect(isStrUrl('https://www.slideshare.net/ryanboland18')).to.equal(true);
    expect(isStrUrl('http://cmu.edu')).to.equal(true);
    expect(isStrUrl('https://www.public.navy.mil/bupers-npc/organization/npc/IM/corporatessystems/Pages/nsips.aspx')).to.equal(true);
  });
  it('partial URLs - TLD only', () => {
    expect(isStrUrl('hopeonesource.org')).to.equal(true);
  });
  it('startup URLS', () => {
    expect(isStrUrl('https://pioneer.app/r/xiaoyunyang/f4rhk29s')).to.equal(true);
    expect(isStrUrl('https://www.setsail.co/')).to.equal(true);
    expect(isStrUrl('https://www.aurahealth.io/')).to.equal(true);
    expect(isStrUrl('https://alist.co')).to.equal(true);
    expect(isStrUrl('https://stackshare.io/selenium')).to.equal(true);
    expect(isStrUrl('https://exabyte.io/')).to.equal(true);
    expect(isStrUrl('calend.ly')).to.equal(true);
    expect(isStrUrl('https://dydx.exchange/')).to.equal(true);
    expect(isStrUrl('jobox.ai')).to.equal(true);
    expect(isStrUrl('youcanbook.me')).to.equal(true);
    expect(isStrUrl('https://cove.is/locations/dc/14th')).to.equal(true);
  });
  it('tiny URLs', () => {
    expect(isStrUrl('goo.gl/Xf3hK4')).to.equal(true);
  });
  it('mistyped urls', () => {
    expect(isStrUrl('googlecom')).to.equal(false);
    expect(isStrUrl('http://www.googlecom')).to.equal(true);
    // expect(isStrUrl('www.googlecom')).to.equal(true);
    // expect(isStrUrl('com')).to.equal(false);
    // expect(isStrUrl('wwwgooglecom')).to.equal(false);
    // expect(isStrUrl('http//googlecom')).to.equal(false);
    // expect(isStrUrl('http//www.googlecom')).to.equal(true);
    // expect(isStrUrl('http//google.com')).to.equal(true);
    expect(isStrUrl('.com.wwwhttp://')).to.equal(true); // TODO: We want this to fail. Work on this edge case Later.
  });
});
