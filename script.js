// Load saved skills when page opens
window.onload = function() {
    let skills = JSON.parse(localStorage.getItem("skills")) || [];

    skills.forEach(skill => {
        addSkillToList(skill);
    });
};

function addSkill() {
    let input = document.getElementById("skillInput");
    let skill = input.value;

    if (skill === "") return;

    addSkillToList(skill);

    let skills = JSON.parse(localStorage.getItem("skills")) || [];
    skills.push(skill);
    localStorage.setItem("skills", JSON.stringify(skills));

    input.value = "";
}

function addSkillToList(skill) {
    let li = document.createElement("li");
    li.textContent = skill;
    document.getElementById("skillList").appendChild(li);
}