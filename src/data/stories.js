import story1Video from '../assets/Story 1.mp4'

const posters = ['/images/stories/story-1.jpg', '/images/stories/story-2.jpg', '/images/stories/story-3.jpg']

const defaultStories = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  poster: posters[index % posters.length],
  video: index === 0 ? story1Video : null,
}))

export default defaultStories
