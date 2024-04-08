import { useMemo } from "react"
import Post from "../Post/Post"
import Block from "../../../../common/components/Block/Block"
import { useSelector } from "react-redux"
import { PostType, StateType } from "common/types/types"
import React from "react"
import InputPost from "features/profile/InputPost/InputPost"

const Posts = () => {
  const posts = useSelector((store: StateType) => store.posts)
  const postsList = useMemo(() => {
    return posts.map((post: PostType) => {
      return <Post key={post.id} post={post} />
    })
  }, [posts])

  return (
    <>
      <Block>
        <InputPost />
      </Block>
      {postsList}
    </>
  )
}

export default React.memo(Posts)
