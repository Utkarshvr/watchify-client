const dummyComments = [
  {
    video: "2u2xum289u",
    user: "USER 1",
    comment: "Nice Video!",
    isReply: false,
    _id: "jr8392h3892ue",
  },
  {
    video: "2u2xum289u",
    user: "USER 2",
    comment: "Maza agay bhai yeahh!!",
    isReply: false,
    _id: "j832jdad89dj",
  },
  {
    video: "2u2xum289u",
    user: "THE REPLIER",
    comment: "Kya maza agaya bhai?",
    isReply: true,
    commentID: "j832jdad89dj",
    _id: "fnowe89c324u8",
  },
  {
    video: "2u2xum289u",
    user: "replier 2",
    comment: "Kya maza agaya bhai?",
    isReply: true,
    commentID: "j832jdad89dj",
    _id: "fnowe89c324u8",
  },
];

const formatComments = dummyComments
  .map((comment) => {
    const replies = dummyComments.filter(
      (com) => com.isReply && comment._id === com.commentID
    );
    //   console.log(replies);

    if (replies.length > 0) return { ...comment, replies };

    if (!comment.isReply) return comment;
  })
  .filter(Boolean);
console.log(formatComments);

// export default dummyComments;
