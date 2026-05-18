const byuiCourse = {
    code: "WDD 231",
    name: "Web Frontend Development I",
    sections: [
        {
            sectionNum: 1,
            roomNum: "STC 353",
            enrolled: 26,
            days: "TTh",
            instructor: "Bro T"
        },
        {
            sectionNum: 2,
            roomNum: "STC 347",
            enrolled: 25,
            days: "TTh",
            instructor: "Sis A"
        }
    ],
    changeEnrollment: function (sectionNum, add = true) {
        const section = this.sections.find(
            (section) => section.sectionNum === sectionNum
        );

        if (section) {
            if (add) {
                section.enrolled += 1;
            } else {
                section.enrolled -= 1;
            }
        }
    }
};

export default byuiCourse;