### **Data Review, Editor, and Exporter Project Description**

**Approach**: My approach for this project was first to decide upon which grid/table library would be best to 
effectively and efficiently implement the required core functionality. As a result, I decided upon AG Grid Community because it is a robust, feature-rich data grid and the advanced enterprise features were not required. Ag Grid Community comes with custom cell renderering, CSV export, tooltip and styling functionality, so now I just needed a modal library and decided upon react-modal. 
Once my libraries were sorted out, I began by implementing the api call. With the data returned, I began structuring out my grid definitions and interfaces. I then wrote styled-validation logic for the grid cells, added the export CSV functionality, and created a custom cell renderer for my error summary cell which would drive the modal. For the modal information, I implemented logic that would sort by severity (critical > warning) and pushed error messages acordingly. Finally, I added custom RGB coloring for grid cells and included Heroicons for a more sleek and modern look. 
For Deployment, I went with Vercel as it integrates well with next.js projects and has detailed build error messages.


**Assumptions**: For the data grid coloring, I assumed for the green valid feilds that it was best to just set the background color and not border to make it stick out less. For the red(errors) and yellow(warnings), I decided to set the background color to .5 opacity and the border to full opacity to make them pop out more to draw immediate attention from the user to those cells. Also, I decided not to include the key field names(Zipcode, ect) within the error modal as I felt the messages were descriptive enough for the fields they refered to.


**Improvements**: With more time, I would have liked to customize the cell tooltip more to include severity coloring along with icons to compliment as well. I also would have liked to add light/dark mode styling as it makes web apps feel more modern and customizable, but it requires more thought on tailwind/global.css setup and color schema. 