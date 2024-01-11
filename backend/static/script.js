const addCourseBtn = document.querySelector("#addCourse")
const addCourseModal = new bootstrap.Modal(document.querySelector("#exampleModalCenter"), {})



addCourseBtn.addEventListener("click", () => {
    addCourseModal.show()
})
