"use client"

import { useState, useEffect, FormEvent } from 'react'
import Client, { types } from "noapi"
import { FaGithub, FaCheck, FaTrash, FaPlus } from "react-icons/fa";

const api = new Client()

export default function Home() {
  const [todos, setTodods] = useState<types.Todo[]>()
  const [title, setTitle] = useState<string>()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title)
      throw Error("enter title")
    api.collection("todo").post({ title })
    setTitle("")
  }

  useEffect(() => {
    function onLoad(todo: any, io: any) {
      if (io)
        api.collection("todo").get().then(d => {
          setTodods(d)
        })
    }

    api.collection("todo").on(["created", "patched", "deleted"], onLoad)

    api.collection("todo").get().then(d => {
      setTodods(d)
    })

    return () => {
      api.collection("todo").off(["created", "patched", "deleted"], onLoad)
    }
  }, [])

  return (<span className="flex flex-col gap-2 justify-center items-center bg-gray-900 min-h-full">
    <h1 className="flex text-2xl text-white font-bold">noapi-todo-nextjs</h1>
    <span className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg w-96 text-gray-200 items-center">
      {todos?.map((todo) => (
        <span key={todo._id}>
          <input className="hidden" type="checkbox" checked={todo.done} id={todo._id} value={todo._id} onChange={e => api.collection("todo").patch({ done: e.target.checked }, { query: { _id: e.target.value } })} />
          <label className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900" htmlFor={todo._id}>
            <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
              <FaCheck size={22} />
            </span>
            <span className="flex flex-1 ml-4 text-sm">{todo.title}</span>
            <button onClick={e => api.collection("todo").delete(todo._id)} className='text-slate-700 hover:text-white'><FaTrash /></button>
          </label>
        </span>
      ))}
      <form onSubmit={submit} className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
        <button type="submit">
          <FaPlus size={22} />
        </button>

        <input onChange={e => setTitle(e.target.value)} value={title} className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text" placeholder="add a new task" />
      </form>
    </span>
    <span className="flex">
      <a target='_blank' className='flex gap-1 items-center text-sm text-white' href="https://github.com/kav3/noapi-todo-nextjs"><FaGithub size={16} /> github </a>
    </span>
  </span>);
}