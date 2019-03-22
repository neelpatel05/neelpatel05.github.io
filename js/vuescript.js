var app = new Vue({
    el: '#table',
    created() {
        this.fetchData();
    },
    data: {
      posts:[],
      repos:[],
      time:''
    },
    methods:{
        fetchData() {
            axios.all([
                axios.get('https://api.github.com/users/neelpatel05/events'),
                // axios.get('https://api.github.com/users/neelpatel05/repos')
            ])
            .then(
                axios.spread((eventresponse) => {
                    //Network Time
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    this.time=loadTime
                    console.log(this.time)
                    //Event Response
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
                        console.log(this.posts)
                    }
                    
                    // Repo Event
                    // var repo=["eAttend","github-profile-android","github-profile-ios","graduate-admission","onlineMusicPlayer","terminal-bot"]
                    // var languagesurl=[]
                    // for(var i=0;i<reporesponse.data.length;i++){
                    //     reponame=reporesponse.data[i].name
                    //     if(reponame==repo[0] || reponame==repo[1] || reponame==repo[2] || reponame==repo[3] || reponame==repo[4] || reponame==repo[5]){
                    //         var dummydata={
                    //             "name":reponame,
                    //             "description":reporesponse.data[i].description,
                    //             "url":reporesponse.data[i].html_url,
                    //             "language":reporesponse.data[i].language,
                    //             "languages":{}
                    //         }
                    //         languagesurl.push(reporesponse.data[i].languages_url)
                    //         this.repos.push(dummydata)
                    //     }
                    // }
                    // axios.all([
                    //     axios.get(languagesurl[0]),
                    //     axios.get(languagesurl[1]),
                    //     axios.get(languagesurl[2]),
                    //     axios.get(languagesurl[3]),
                    //     axios.get(languagesurl[4]),
                    //     axios.get(languagesurl[5])
                    // ])
                    // .then(
                    //     axios.spread((repo0response, repo1response, repo2response, repo3response,repo4response,repo5response) => {

                              
                    //             for(var i=0;i<this.repos.length;i++){
                    //                 if(this.repos[i].name==repo[0]) {
                    //                     this.repos[i].languages=repo0response.data
                    //                 } else if(this.repos[i].name==repo[1]) {
                    //                     this.repos[i].languages=repo1response.data
                    //                 } else if(this.repos[i].name==repo[2]) {
                    //                     this.repos[i].languages=repo2response.data
                    //                 } else if(this.repos[i].name==repo[3]) {
                    //                     this.repos[i].languages=repo3response.data
                    //                 } else if(this.repos[i].name==repo[4]) {
                    //                     this.repos[i].languages=repo4response.data
                    //                 } else if(this.repos[i].name==repo[5]) {
                    //                     this.repos[i].languages=repo5response.data
                    //                 }
                    //             }
                    //         }
                    //     )
                    // ).catch((error) => {
                    //     console.log(error)
                    // });
                }))
                .catch((eventerror)=>{
                    console.log(eventerror)
                    document.getElementById("events").style="display:none";
                    document.getElementById("word").style="display:none";
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    this.time=loadTime
                })
        }
    }
})

