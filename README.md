# Web Development Project 4 - Pretty Cat Breed Discovery

Submitted by: **Karla Guio Cortes**

This web app: **An interactive discovery platform that fetches random cat breed information from The Cat API. Users can explore different breeds by viewing their images, origins, temperaments, and other characteristics. The application includes a filtering system where clicking on any displayed attribute adds it to a restriction list, ensuring those specific traits won't appear in subsequent searches.**

Time spent: **6** hours spent in total
Github: https://github.com/karlaguio/cat_discovery_website

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - Consistent attribute display across all API responses (breed name, origin, temperament, weight, life span, and discovery date)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - Single cat breed shown per fetch with matching image and attributes
  - All displayed information corresponds to the shown cat image
- [x] **API call response results should appear random to the user**
  - Random breed selection from available options each time the discover button is clicked
  - Large dataset from The Cat API ensures variety in results
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - Four clickable attributes available: breed name, origin, temperament, and date
  - Clicking adds attribute to ban list immediately
  - Clicking banned items removes them from the list
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Filtering logic prevents any banned attributes from appearing in future results
  - Multiple attribute types can be filtered simultaneously
  - [x] _Ban list items are immediately removable by clicking on them_

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [ ] Users can see a stored history of their previously displayed results from this session

The following **additional** features are implemented:

* [x] Display of supplementary information including weight and lifespan
* [x] Counter showing total available breeds and currently banned items
* [x] Responsive layout optimized for various screen sizes
* [x] Detailed console logging for development debugging

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

### Challenges Encountered:

**API Integration Issues:** Initially attempted to use NASA APOD API but encountered service outages. Switched to The Cat API which proved more reliable and offered richer data for the discovery feature.

**Ban List Logic:** Implementing the filtering system required careful consideration of how to check multiple attribute types against the ban list while maintaining randomness in results.

**State Management:** Coordinating multiple useState hooks for current item, loading states, error handling, and the ban list required thoughtful organization.

**API Key Configuration:** Learning to properly use environment variables in Vite with the VITE_ prefix convention.

## License

    Copyright 2024 Karla Guio Cortes

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
