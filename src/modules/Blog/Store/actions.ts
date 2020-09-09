import { ActionType } from './types';

export function fetchBlogs() {
  return {
    type: ActionType.FETCH_BLOGS,
  };
}

export function fetchBlogsFullFilled(blogs: [] = []) {
  return {
    type: ActionType.FETCH_BLOGS_FULFILLED,
    blogs,
  };
}

export function fetchBlogFullFilled(blog: object) {
  return {
    type: ActionType.FETCH_BLOG_FULFILLED,
    blog,
  };
}

export function fetchBlog(id: string) {
  return {
    type: ActionType.FETCH_BLOG,
    id,
  };
}

export function createBlog(data: object) {
  return {
    type: ActionType.CREATE_BLOG,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateBlog(data: object) {
  return {
    type: ActionType.UPDATE_BLOG,
    data,
  };
}

export function removeBlog(id: string) {
  return {
    type: ActionType.REMOVE_BLOG,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_BLOG_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_BLOG_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_BLOG_HEADER,
    data
  }
}
