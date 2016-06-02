
var github_url = "https://api.github.com/";
var github_get_request = "users/PrinceDhaliwal/repos";

  // RepoList
  //  RepositoryList
  //      Repository
  var Repository = React.createClass({
    render: function() {
      return (
        <div className='repobox'>
          <div className='repoheading'>
              <a href={this.props.repoURL}>
                <h1 className='repoh1'>{this.props.repoName + ' '}</h1>
              </a>
          </div>
          <div className={this.props.hasDescription}>
            {this.props.description}
          </div>
          <div className={this.props.hasLang}>
            {this.props.language}
          </div>
        </div>
      );
    }
  });

  var RepositoryList = React.createClass({
    render: function() {
      var repoList = this.props.data;
      var repoNodes = repoList.map(function(repo) {
          if (repo.fork)
            return null;
          return (<Repository key={repo.name } repoName={repo.name} repoURL={repo.html_url} hasDescription={repo.description ? '' :'hidden'}
            description={repo.description} hasLang={repo.language == 'null' ? 'hidden' : 'language-m'}
            language={repo.language} />);
        }).filter(function(element) {
          return element;
        });

      return (
        <div className='repositoryList'>
          {repoNodes}
        </div>);
    }
  })

  var RepoList = React.createClass({
    getDataFromServer: function() {
      $.ajax({
        url: github_url + github_get_request,
        dataType: 'json',
        cache: false,
        success: function(data) {
        this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    getInitialState: function() {
      return { data: [] };
    },

    componentDidMount: function() {
      this.getDataFromServer();
    },

    render: function() {
      return (
        <div className="repoList">
          <i className='fa fa-code'></i>
          <h1 className='project-heading-m'>Projects</h1>
          <RepositoryList data={this.state.data} />
        </div>
      );
    }
  });

  ReactDOM.render(
    <RepoList />,
    document.getElementById('rsec')
  )