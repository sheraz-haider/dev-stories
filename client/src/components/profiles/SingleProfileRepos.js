import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getRepos } from '../../store/actions/profile';
import useStore from '../../hooks/useStore';
import Spinner from '../layout/Spinner';

function SingleProfileRepos({ username }) {
  const ref = useRef({});

  const [
    {
      profile: { repos },
    },
    dispatch,
  ] = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ref.current.mounted = true;

    dispatch(getRepos(username, setLoading, ref.current));

    return () => {
      ref.current.mounted = false;
    };
  }, [username]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos.length > 0 ? (
        repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
      ) : (
        <h4>No repos found</h4>
      )}
    </div>
  );
}

SingleProfileRepos.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SingleProfileRepos;

function RepoItem({ repo }) {
  const {
    html_url,
    name,
    description,
    stargazers_count,
    watchers,
    forks,
  } = repo;

  return (
    <div className='repo bg-white p-1 my-1'>
      <div>
        <h4>
          <a href={html_url} target='_blank' rel='noopener noreferrer'>
            {name}
          </a>
        </h4>
        <p>{description}</p>
      </div>
      <div>
        <ul>
          <li className='badge badge-primary'>Stars: {stargazers_count}</li>
          <li className='badge badge-dark'>Watchers: {watchers}</li>
          <li className='badge badge-light'>Forks: {forks}</li>
        </ul>
      </div>
    </div>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
