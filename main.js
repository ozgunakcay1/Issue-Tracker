document.getElementById("issueInputForm").addEventListener("submit" , saveIssue);

function saveIssue (e){
    const issueDesc =document.getElementById("issueDescInput").value;
    const issueSeverity = document.getElementById("issueSeveritycInput").value;
    const issueAssignedTo = document.getElementById("issueAssingedToInput").value;
    const issueId = new Date().getTime();
    const issueStatus = "Open";
    const issue = { 
        id : issueId, 
        description : issueDesc , 
        severity : issueSeverity, 
        assignedTo : issueAssignedTo,
        status : issueStatus 
     };

     if(localStorage.getItem("issues") == null){
        const issues =[];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
        const issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }


    document.getElementById("issueInputForm").reset();

    fetchIssues ();

    e.preventDefault();
};

//Close butonuna basinca status un closed olarak degismesi 
function setStatusClosed(id){
    const issues = JSON.parse(localStorage.getItem('issues'));
 
    for (let i = 0; i < issues.length; i++ ){
        if(issues[i].id == id){
            issues[i].status = "Closed";
           
        }
    };
    localStorage.setItem('issues',JSON.stringify(issues));

    fetchIssues();
}

//Delete butonuna basinca silinmesi
function deleteIssue(id){
    const issues = JSON.parse(localStorage.getItem('issues'));
 
    for (let i = 0; i < issues.length; i++ ){
        if(issues[i].id == id){
            issues.splice(i, 1);
           
        }
    };
    localStorage.setItem('issues',JSON.stringify(issues));

    fetchIssues();
};



function fetchIssues (){
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for ( let i = 0; i < issues.length; i++ ){
        const id = issues[i].id;
        const desc = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        const status = issues[i].status;

        const statusColor = status === 'Closed' ? 'bg-danger-subtle' : 'bg-info';


        issuesList.innerHTML += `<div class="bg-light p-3 mt-3 border rounded">` +
                        `<h6> Issue ID : ${id} </h6>` +
                        `<p ><span class="badge ${statusColor}" >${status}</span></p>` +
                        `<h3> ${desc} </h3>` +
                        `<p><span><i class="bi bi-clock"></i></span> ${severity} </p>` +
                        `<p><span><i class="bi bi-person-fill"></i></span> ${assignedTo} </p>` +
                        `<a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning btn-sm mx-2 ">Close</a>` +
                        `<a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger btn-sm">Delete</a>` +
                        `</div>`;
                 
    }
};


