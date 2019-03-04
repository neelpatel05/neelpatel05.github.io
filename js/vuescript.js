var app = new Vue({
    el: '#table',
    created() {
        this.fetchData();
    },
    data: {
      posts:[],
      time:'',
      repos:[]
    },
    methods:{
        fetchData() {

            axios.all([
                axios.get('https://api.github.com/users/neelpatel05/events'),
                axios.get('https://api.github.com/users/neelpatel05/repos')
            ])
            .then(
                axios.spread((eventresponse, reporesponse) => {
                    //Network Time
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    this.time=loadTime
                    
                    //Event Response
                    console.log(eventresponse.headers["x-ratelimit-remaining"])
                    console.log(reporesponse.headers["x-ratelimit-remaining"])
                    for(var i=0;i<5;i++){
                        var name=eventresponse.data[i].repo.name.split("/")
                        var createdate=eventresponse.data[i].created_at.split("T")
                        var createdate1=createdate[0].split("-")
                        var createdate2=createdate1.reverse().join("-")
                        if (eventresponse.data[i].type == "PushEvent"){
                            
                            var data={
                                "created_at":createdate2,
                                "name":name[1],
                                "url":eventresponse.data[i].repo.url,
                                "description":eventresponse.data[i].payload.description,
                                "type":eventresponse.data[i].type,
                                "numberofcommits":eventresponse.data[i].payload.commits.length,
                                "commits":eventresponse.data[i].payload.commits
                            }
                        }else{
                            var data={
                                "created_at":createdate2,
                                "name":name[1],
                                "url":eventresponse.data[i].repo.url,
                                "description":eventresponse.data[i].payload.description,
                                "type":eventresponse.data[i].type
                            }
                        }
                        this.posts.push(data)
                    }
                    
                    //Repo Event
                    var repo=["graduate-admission","eAttend","github-profile-ios","github-profile-android"]
                    var languagesurl=[]
                    for(var i=0;i<reporesponse.data.length;i++){
                        reponame=reporesponse.data[i].name
                        if(reponame==repo[0] || reponame==repo[1] || reponame==repo[2] || reponame==repo[3]){
                            var dummydata={
                                "name":reponame,
                                "description":reporesponse.data[i].description,
                                "url":reporesponse.data[i].html_url,
                                "language":reporesponse.data[i].language,
                                "languages":{}
                            }
                            languagesurl.push(reporesponse.data[i].languages_url)
                            this.repos.push(dummydata)
                            // console.log(languagesurl)
                        }
                    }
                    console.log(languagesurl)
                    axios.all([
                        axios.get(languagesurl[0]),
                        axios.get(languagesurl[1]),
                        axios.get(languagesurl[2]),
                        axios.get(languagesurl[3])
                    ])
                    .then(
                        axios.spread((repo0response, repo1response, repo2response, repo3response) => {

                                console.log(repo3response)
                                for(var i=0;i<this.repos.length;i++){
                                    if(this.repos[i].name==repo[0]) {
                                        this.repos[i].languages=repo0response.data
                                    } else if(this.repos[i].name==repo[1]) {
                                        this.repos[i].languages=repo1response.data
                                    } else if(this.repos[i].name==repo[2]) {
                                        this.repos[i].languages=repo2response.data
                                    } else if(this.repos[i].name==repo[3]) {
                                        this.repos[i].languages=repo3response.data
                                    }
                                }
                                console.log(this.repos)
                            }
                        )
                    ).catch((error) => {
                        console.log(error)
                    });
                }))
                .catch((eventerror)=>{
                    console.log(eventerror)
                    document.getElementById("events").style="display:none";
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    this.time=loadTime
                })
        }
    }
})

