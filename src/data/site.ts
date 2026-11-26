// Site text is split into small files so the editor shows short, simple forms.
// business.json  -> "Your details"
// homepage.json  -> "Homepage words"
// reviews.json   -> "Customer reviews"
// advanced.json  -> not shown in the editor (collections list, Instagram feed URL)
import business from './business.json';
import homepage from './homepage.json';
import reviews from './reviews.json';
import advanced from './advanced.json';

const site = { ...advanced, ...homepage, ...reviews, ...business };
export default site;
