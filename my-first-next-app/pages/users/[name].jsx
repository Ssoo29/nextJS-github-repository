import React from "react";
import fetch from "isomorphic-unfetch";
import css from "styled-jsx/css";
import Profile from "../../components/Profile";
import Respository from "../../components/Repositories";

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
  .repos-wrapper {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    padding: 0px 16px;
  }
  .repos-header {
    padding: 16px 0px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #e1e428;
  }
  .repos-count {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 36, 0.08);
    border-radius: 20px;
  }
  .repository-wrapper {
    width: 100%;
    border-bottom: 1px solid #e1e428;
    padding: 24px 0;
  }
  .repository-description {
    padding: 12px 0;
  }
  a {
    text-decoration: none;
  }
  .repository-name {
    margin: 0;
    color: #0366d6;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
  }
  .repository-name:hover {
    text-decoration: underline;
  }
  .repository-description {
    margin: 0;
    font-size: 14px;
  }
  .repository-language {
    margin: 0;
    font-size: 14px;
  }
  .repository-updated-at {
    margin-left: 20px;
  }
`;

const name = ({ user, repos }) => {
  return (
    <div className="user-contents-wrapper">
      <Profile user={user} />
      <Respository user={user} repos={repos}></Respository>
      <style jsx>{style}</style>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name, page } = query;
  try {
    let user;
    let repos;

    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      user = await res.json();
    }
    const repoRes = await fetch(
      `https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`
    );
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    }
    return { props: { user, repos } };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};

export default name;
