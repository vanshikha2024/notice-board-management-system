import prisma from "../../../lib/prisma";

export default async function handler(req, res) {

  if (req.method === "POST") {

  const { title, body, category, priority, publishDate } = req.body;

  if (
    !title ||
    !body ||
    !category ||
    !priority ||
    !publishDate
  ) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  if (isNaN(new Date(publishDate).getTime())) {
    return res.status(400).json({
      error: "Invalid date",
    });
  }

  try {

    const notice = await prisma.notice.create({
      data: {
        title,
        body,
        category,
        priority,
        publishDate: new Date(publishDate),
      },
    });

    return res.status(201).json(notice);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to create notice",
    });

  }
}

  if (req.method === "GET") {

    const notices = await prisma.notice.findMany({
  orderBy: [
    {
      priority: "asc",
    },
    {
      createdAt: "desc",
    },
  ],
});
    return res.status(200).json(notices);

  }

  return res.status(405).json({
    error: "Method not allowed",
  });

}