# Testing

## Code validation

The FIFA World Cup Quiz Game has been throughly tested and all the code has been run through the [W3C HTML validator](https://validator.w3.org/), the [W3C CSS validator](https://jigsaw.w3.org/css-validator/) and the [JSHint validator](https://jshint.com/). Minor errors were found by the JSHint validator because of some missing semicolon, this was easily fixed by adding them where needed.

Below are the HTML validator results for each of the stages:

- ### Landing

    ![HTML validator results](assets/readme-images/html-validator.jpg)

- ### Level selection

    ![HTML validator results](assets/readme-images/html-validator.jpg)

- ### Quiz round

    ![HTML validator results](assets/readme-images/html-validator.jpg)

- ### End quiz

    ![HTML validator results](assets/readme-images/html-validator.jpg)

Below are the CSS validator results:

![CSS validator results](assets/readme-images/css-validator.jpg)

Below are the JSHint validator results:

- There are 22 functions in this file;
- Function with the largest signature take 3 arguments, while the median is 0;
- Largest function has 16 statements in it, while the median is 3.5;
- The most complex function has a cyclomatic complexity value of 5 while the median is 2.

![CSS validator results](assets/readme-images/jshint.jpg)

# Responsiveness test

The responsive design test was carried out manually through [**Google Chrome DevTools**](https://developer.chrome.com/docs/devtools/) and [**Responsive Design Checker**](https://responsivedesignchecker.com/).

|        | Soni Xperia Z2 | Samsung Galaxy S7 | Apple iPhone 7 | Apple iPad Mini | Apple iPad Pro| Display <1200px | Display >1200px |
|--------|:--------------:|:-----------------:|:--------------:|:---------------:|:-------------:|:----------------:|:----------------:|
| Render | pass           | pass              | pass           | pass            | pass          | pass             | pass             |
| Images | pass           | pass              | pass           | pass            | pass          | pass             | pass             |
| Links  | pass           | pass              | pass           | pass            | pass          | pass             | pass             |

# Browser compatability

The website was tested on a wide range of browsers and didn't present any visual issues for the user, **Google Chrome**, **Microsoft Edge**, **Safari** and **Mozilla Firefox**. The apearance, functionality and responsiveness was consistent throughout the browsers and device sizes.

# Testing user stories

- As a user I want to understand the purpose of the site straight away;
    - On the home page, the hero image with a row of solar panels in a field with the header **Renewable energy** and the text bellow inviting the user to get in touch to learn how the company can help achieve the user's energy goals, should allow the user to interprete the main purpose of the website.

- As a user I want to be able to navigate through the whole site easily;
    - There is a **navigation menu** on the top of every page with links to all the pages;
    - On every page there is a footer with a second **menu** with links to all the pages.

- As a user I want to know how other customers experiences has been working with Akemi;
    - At the bottom of the home page there is a **Testimonials** section with feedback from other customers experiences.

- As a user I want to connect with Akemi on social media;
    - On the footer in every page there are links to all of Akemis **social media pages**.

- As a user I want to know more about Akemi;
    - On the about page, there is a section with an **introduction about** Akemi.

- As a user I want to see portfolio projects from Akemi;
    - At the bottom of the about page, there is a section with some of Akemi's **completed projects**.

- As a user I want to easily be able to contact Akemi for more information.
    - On the contact page there is a form which allows the user to fill in his contact information and send Akemi a message;
    - On the footer in every page there is also **contact information** for the company, such as: telephone, email and address.

# Known bugs

- ## Resolved
    - During the validation check, two errors were found on the home page. Below is a quick description and the fix used:

        ![Bugs found](assets/readme-images/bugs.jpg)
        
        Both errors were related to the same problem. This was easily fixed by removing the \<button> element, and styling the \<a> element as a button.

    - A position change was done on the cover image of the about page in order to improve the visibility of some elements that were being clipped on smaller screens.

    - During the lighthouse test, an accessibility recomendation was found: to change the background colour of the book a call button on the cover text of the home page to improve contrast. After the colour change, the accessibility result was improved.

- ## Unresolved
    - The data from the form on the contact page doesn't push anywhere. This is due to the limitations of this portfolio project. However it can easily be fixed for a live version of the website.

# Aditional testing

## Lighthouse

The website was also tested using [**Google Lighthouse**](https://developers.google.com/web/tools/lighthouse) in the Chrome DevTools to test each of the pages for:
- Performance - how the website performs on loading;
- Accessibility - how is the accessibility for all users and sugested improvements;
- Best practices - website conformity to industry best practices;
- SEO - Search Engine Optimizationhow, how the website is optimized for search engine results and ranking.

    Here are the results achieved for the Akemi website in Lighthouse:

    ![Lighthouse results](assets/readme-images/lighthouse.jpg)

## Peer review

The website also whent throught some peer reviews, both in the software development field and outside by other users. In general the reviews were positive, with some minor adjustments needed in some responsive design, which were easily fixed within the CSS. There were some minor grammar and speeling errors that were also fixed.

Back to [**README file.**](README.md)