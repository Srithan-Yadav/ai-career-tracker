function addSkill() {
    let input = document.getElementById("skillInput");
    let skill = input.value;

    if (skill === "") return;

    let li = document.createElement("li");
    li.textContent = skill;

    document.getElementById("skillList").appendChild(li);

    input.value = "";
}