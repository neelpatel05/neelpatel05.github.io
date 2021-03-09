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
                axios.get('https://api.github.com/users/neelpatel05/repos?per_page=100')
            ])
            .then(
                axios.spread((eventresponse,reporesponse) => {
                    //Network Time
                    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
                    this.time=loadTime
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
                                "type":eventresponse.data[i].type,
                                "numberofcommits":eventresponse.data[i].payload.commits.length,
                                "commits":eventresponse.data[i].payload.commits
                            }
                        }else{
                            var data={
                                "created_at":createdate2,
                                "name":name[1],
                                "url":eventresponse.data[i].repo.url,
                                "type":eventresponse.data[i].type
                            }
                        }
                        this.posts.push(data)

                    }
                    console.log(this.posts)
                    //Repo Event
                    var repo=["antismokify-gpu","bruteforce-zip","rooted-MiniShare","tiny-web-server","by-passing-ASLR","offset-finder","seed-labs","ROP"]
        
                    for(var i=0;i<reporesponse.data.length;i++) {
                        reponame=reporesponse.data[i].name
                        if(reponame==repo[0] || reponame==repo[1] || reponame==repo[2] || reponame==repo[3] || reponame==repo[4] || reponame==repo[5] || reponame==repo[6]) {
                            var dummydata={
                                "name":reponame,
                                "description":reporesponse.data[i].description,
                                "url":reporesponse.data[i].html_url,
                                "language":reporesponse.data[i].language,
                            }
                            this.repos.push(dummydata)
                        }
                    }
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

