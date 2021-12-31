import React, { FunctionComponent, useEffect, useState } from 'react'
import { Form, useLoaderData, useActionData } from 'remix'

interface Poke {
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
}

export const loader = async (context: any) => {
  console.log(context.params, 'something here')
  return fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
}

export const action = async ({ request }: any) => {
  const form = await request.formData()
  return form
}

const Posts = () => {
  const data = useLoaderData<Poke>()

  const handleOnChangeForm = (event: { target: any }) => {
    const name = event.target.name
    const val = event.target.value
  }
  return (
    <div>
      <h1>header</h1>
      <h2> Pikachu </h2>
      <Form method="post" onChange={handleOnChangeForm}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="attack"> Attack </label>
        <input type="text" id="attack" name="attack" />

        <button type="submit"> Submit </button>
      </Form>
      <pre>
        {data.stats.map((s) => (
          <React.Fragment key={s.stat.name}>
            <p>
              {' '}
              name : {s.stat.name} - {s.base_stat}
            </p>
            <p> url : {s.stat.url}</p>
          </React.Fragment>
        ))}
      </pre>
    </div>
  )
}

export default Posts
