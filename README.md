# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Costanza Volpini | 297353 |
| Eleonora Rocchi | 298382 |
| Wei Jiang | 313794 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### 2.1 Dataset
#### 2.1.1 Crawling
Our dataset has been generated by crawling [is-academia](https://isa.epfl.ch/imoniteur_ISAP/!gedpublicreports.htm?ww_i_reportmodel=66627699).
<p align="center">
 <img src="/src/images/isa.jpg" width="400px" />
</p>

The [crawling process](https://github.com/com-480-data-visualization/com-480-project-xiaozu/tree/milestone-1/src/crawling) has requested around 7 hours for a total of 6995 excel files. The crawler was composed by a javascript code to retrieve all the course identifiers (e.g., ww_x_MAT=2032682720) to construct our query and a python part to download the files. We have been able to crawl all the bachelor and master courses offered by EPFL from 2012 until now. 

#### 2.1.2 Pre-processing [TO BE UPDATED]
A challenging task was to clean the data crawled and to select the ones we are interested in. Firstly, the files contained special characters (accents), reason why, we have chosen the Latin encoding. Moreover, data is saved in excel files, which actually contain HTML code. __However, after having parsed, the files are consistent with each other.(updated this part --> it seems they are not consistent!) and add part about pre-processing__
We are more interested in master courses since they are more customizable from the student than Bachelor ones (almost all are mandatory). 

#### 2.1.3 Database generated
We have decided to store our data in 4 tables: Student, Enrollment, Course, Teaching.
- ``csv/courses.csv``: contains unique courses id, course name, teaching year for 15936 courses.
- ``csv/student.csv``: constains unique student id, student name, student section for 831103 students.
- ``csv/teaching.csv``: contains course id and itd corresponding professor for 831118 courses.
- ``csv/enrollment.csv``: contains student id, course id, student semester for 831129 student enrollments.

### 2.2 Problematic
#### 2.2.1 Target audience
We expect that the end-users who will use our project will be mainly EPFL students but also companies may be interested in the tool. Users can browse and look at different courses taught by EPFL in the years from 2012 to 2020. 

#### 2.2.2 Visualization purposes
- **#Enrollments per course**:  We want to focus on the number of students enrolled in a course over the years to identify the courses which are becoming more popular (e.g., Machine Learning is nowadays a trendy topic, are the number of students enrolled in that course increased respect 2 years ago?).

- **Help the students to choose their courses**: We want to offer a tool to help students make more versed choices during the course registration by offering targeted visualizations. For example, if student "a" did courses "x", "y" and "z" like student "b" it is very likely that the two have similar interests. Then student "b" might see which other courses have been taken by student "a" to help him/her make an initial skimming of the subjects to follow in the semester. More advanced recommendation system algorithms can be experimented.

- **Find your perfect candidate**: Companies can filter applicants by looking to target students who have taken specific courses. 

- **General data representations**: Some examples: a) we could show a graph to show the trend in the number of students over the years (as explained above); b) indicate the number of students who had re-taken an exam. Moreover, other general visualizations would be to show how many new classes have been added in the year "x" or how many have been removed.

### 2.3 Exploratory Data Analysis
Our data analysis contains three parts. For each part we build related tables by Pandas that contain the figures for our objectives and we show some examples in [Pre-analysis.ipynb](https://github.com/com-480-data-visualization/com-480-project-xiaozu/blob/milestone-1/src/data-analysis/Pre-analysis.ipynb).
- **Show the changes of the number of course enrollments over the years**, i.e, for each course, we compare the number of students in different years in order to show the popuarity trend of each course. For instance, the Image processing I course is becoming rapidly increasing popular among students while less students are taking Cryptography and security over the recent years.
<p align="center">
 <img src="/src/images/da1.jpg" width="400px" />
</p>

- **Compare the student major (section) composition of each course**. We get statistics of major intake in each course and then show the different compositions of different courses. For example, the majority of students in Image processing I are from Microengineering while Machine learning is mostly composed by Computer Science and Data Science students.
<p align="center">
 <img src="/src/images/da2.jpg" width="400px" />
</p>

- **Analyze the similarity of courses through the student enrollments based on the the hypothesis that the courses chosen by the same students have some commons**. We build the co-occurrence matrix of each course from the course lists taken by each student. We find it consistent with what we expected, for example, Distributed algorithms has high co-ocurrence matrix coefficient with Concurrent alogorithms which is the same as Data visualization with Applied data analysis.
<p align="center">
 <img src="/src/images/da3.jpg" width="500px" />
</p>

- **Cluster the courses that are more closer each other.** We have treat the students as features (e.g. each course represented by a binary array) and then we have compute the correlation between the 2 courses on these arrays.
PCA plot:
<p align="center">
 <img src="/src/images/da4.jpg" width="400px" />
</p>
TSNE plot:
<p align="center">
 <img src="/src/images/da5.jpg" width="400px" />
</p>

### 2.4 Related work
At the moment, we have not found any other related applications or websites. EPFL students choose courses based on the study plan offered online and keywords that are on the course description pages. As for the feature related to companies, LinkedIn allows HR to find people with specific skills but not for courses that they have done.


##### Some sketches of our future visualizations 
Show courses related to a selected one(s), since we a lot of courses we will ask to the user to filter which one they want to look (e.g., filter by section). Moreover to hightlight the connections (shown in pink in the Fig. below) the user can select multiple courses. When you hover on the title of a course you will see a card on the right showing some insights about it.
<p align="center">
 <img src="/src/images/sketch1.jpg" width="400px" />
</p>

Show the top N courses for a section (e.g. IC) over the years.
<p align="center">
 <img src="/src/images/sketch2.jpg" width="300px" />
</p>


Help a user to choose his/her next semester courses. You can insert your name as a student and it return the graphical representation of the courses that you have done with a suggestion of what you could do based on your interests.
<p align="center">
 <img src="/src/images/sketch4b.jpg" width="500px" />
</p>
<!-- For 1 course how people are distributed between different majors. redo or change it then not for every majors
right: list of popular course
left: master semester
on which semester a course was taken
plot: 1 to 1 relationship or 1 to N -->


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

