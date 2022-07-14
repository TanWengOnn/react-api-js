import "./App.css";
import React from "react";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/comments";

function App() {
  //---------------------Variables---------------------//
  const [get, setGet] = React.useState("");
  const [getStatus, setGetStatus] = React.useState(null);

  const [post, setPost] = React.useState("");
  const [postName, setPostName] = React.useState("");
  const [postEmail, setPostEmail] = React.useState("");
  const [postBody, setPostBody] = React.useState("");
  const [postStatus, setPostStatus] = React.useState(null);

  const [patch, setPatch] = React.useState("");
  const [patchName, setPatchName] = React.useState("");
  const [patchEmail, setPatchEmail] = React.useState("");
  const [patchBody, setPatchBody] = React.useState("");
  const [patchStatus, setPatchStatus] = React.useState(null);

  const [Delete, setDelete] = React.useState("");
  const [deleteStatus, setDeleteStatus] = React.useState(null);

  //---------------------Get Request---------------------//
  function getComment() {
    axios
      .get(`${baseURL}/${get}`)
      .then((response) => {
        setGet(response.data);
        setGetStatus(response.status);
        //console.log(response.data);
      })
      .catch((error) => {
        setGet("");
        setGetStatus(`${error.response.status} (${error.message})`);
        //console.log(error.message);
      });
  }

  //---------------------Post Request---------------------//
  function createComment() {
    axios
      .post(baseURL, {
        name: postName,
        email: postEmail,
        body: postBody,
      })
      .then((response) => {
        setPost(response.data);
        setPostStatus(response.status);
      })
      .catch((error) => {
        setPost(error);
        setPostStatus(`${error.response.status} (${error.message})`);
        //console.log(error);
      });
  }

  //---------------------Patch Request---------------------//
  function patchComment() {
    axios
      .patch(`${baseURL}/${patch}`, {
        name: patchName,
        email: patchEmail,
        body: patchBody,
      })
      .then((response) => {
        setPatch(response.data);
        setPatchStatus(response.status);
        console.log(response.data);
        //console.log(response.status)
      })
      .catch((error) => {
        setPatch(" ");
        setPatchStatus(`${error.response.status} (${error.message})`);
        //console.log(error);
      });
  }

  //---------------------Delete Request---------------------//
  function deleteComment() {
    axios
      .delete(`${baseURL}/${Delete}`)
      .then((response) => {
        //setPatch(response.data);
        setDeleteStatus(response.status);
        console.log(response.data);
        console.log(response.status);
      })
      .catch((error) => {
        setPatch(" ");
        setDeleteStatus(`${error.response.status} (${error.message})`);
        console.log(error);
      });
  }

  //---------------------Get Event---------------------//
  const handleGet = (event) => {
    setGet(event.target.value);
  };

  //---------------------Post Event---------------------//
  const handlePostName = (event) => {
    setPostName(event.target.value);
  };
  const handlePostBody = (event) => {
    setPostBody(event.target.value);
  };
  const handlePostEmail = (event) => {
    setPostEmail(event.target.value);
  };

  //---------------------Patch Event---------------------//
  const handlePatch = (event) => {
    setPatch(event.target.value);
  };
  const handlePatchName = (event) => {
    setPatchName(event.target.value);
  };
  const handlePatchBody = (event) => {
    setPatchBody(event.target.value);
  };
  const handlePatchEmail = (event) => {
    setPatchEmail(event.target.value);
  };

  //---------------------Delete Event---------------------//
  const handleDelete = (event) => {
    setDelete(event.target.value);
  };


  return (
    <div className="container">
      <h1>API Request</h1>
      {/*-------------------Get Request-------------------*/}
      <h2>Get Request</h2>
      <input onChange={handleGet}/>
      <button onClick={getComment}>Get Comment</button> 
      <div>
        <Output postId={get.postId} id={get.id} name={get.name} email={get.email} body={get.body} status={getStatus}/>
      </div>
      
      {/*-------------------Post Request-------------------*/}
      <h2>Post Request</h2>
      <input placeholder="name" onChange={handlePostName}/> <br/>
      <input placeholder="email" onChange={handlePostEmail}/> <br/>
      <input placeholder="body" onChange={handlePostBody}/> <br/>
      <button onClick={createComment}>Post Comment</button>
        <div>
          <Output postId={post ? post.postId : ""} id={post ? post.id : ""} name={post ? post.name : ""} email={post ? post.email : ""} body={post ? post.body : ""} status={postStatus}/>
        </div>
      {/*-------------------Patch Request-------------------*/}
      <h2>Patch Request</h2>
      <input placeholder="id" onChange={handlePatch}/> <br/>
      <input placeholder="name" onChange={handlePatchName}/> <br/>
      <input placeholder="email" onChange={handlePatchEmail}/> <br/>
      <input placeholder="body" onChange={handlePatchBody}/> <br/>
      <button onClick={patchComment}>Patch Comment</button>
        <div>
          <Output postId={patch ? patch.postId : ""} id={patch ? patch.id : ""} name={patch ? patch.name : ""} email={patch ? patch.email : ""} body={patch ? patch.body : ""} status={patchStatus}/>
        </div>
      {/*-------------------Delete Request-------------------*/}
      <h2>Delete Request</h2>
      <input onChange={handleDelete}/>
      <button onClick={deleteComment}>Delete Comment</button>
        <div>
          <p><b>Request Status: {deleteStatus}</b></p>
        </div>
    </div>
  );
}

const Output = ({ postId, id, name, email, body, status }) => {
  return (
    <div>
      <p>Post Id: {postId}</p>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Body: {body}</p>
      <p><b>Request Status: {status}</b></p>
  </div>
  );
};

export default App;
