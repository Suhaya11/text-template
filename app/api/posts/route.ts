import { NextResponse } from 'next/server';
// Local storage mock for UI testing

  try {
    let posts = globalThis.localPosts || [];
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

  try {
    const { content, image, visibility, author } = await req.json();
    if (!content && !image) {
      return NextResponse.json({ error: 'Post must have content or an image' }, { status: 400 });
    }
    let posts = globalThis.localPosts || [];
    const post = {
      id: posts.length + 1,
      author: author || 'mockUser',
      content,
      image,
      visibility: visibility || 'public',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      reposts: []
    };
    posts.unshift(post);
    globalThis.localPosts = posts;
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
