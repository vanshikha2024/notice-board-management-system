import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    priority: "",
    publishDate: "",
  });

  const [notices, setNotices] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");
  
  const [editingId, setEditingId] = useState(null);
  const totalNotices = notices.length;

const urgentNotices = notices.filter(
  (notice) => notice.priority === "Urgent"
).length;

const academicNotices = notices.filter(
  (notice) => notice.category === "Academic"
).length;

const eventNotices = notices.filter(
  (notice) => notice.category === "Event"
).length;

  useEffect(() => {
    fetchNotices();
  }, []);

 const fetchNotices = async () => {
  try {
    const res = await fetch("/api/notices");
    const data = await res.json();

   const sortedData = data.sort((a, b) => {
  if (a.priority === "Urgent" && b.priority !== "Urgent") return -1;
  if (a.priority !== "Urgent" && b.priority === "Urgent") return 1;

  return (
    new Date(b.publishDate) -
    new Date(a.publishDate)
  );
});

    setNotices(sortedData);

  } catch (error) {
    console.error("Error fetching notices:", error);
  }
};
  const deleteNotice = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      fetchNotices();

    } catch (error) {
      console.error(error);
      alert("Failed to delete notice");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = editingId
      ? `/api/notices/${editingId}`
      : "/api/notices";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);

    alert(
      editingId
        ? "Notice Updated Successfully!"
        : "Notice Added Successfully!"
    );

    await fetchNotices();

    setFormData({
      title: "",
      body: "",
      category: "",
      priority: "",
      publishDate: "",
    });

    setEditingId(null);

  } catch (error) {
    console.error(error);
    alert("Operation Failed");
  }
};
  return (
    <div
  style={{
    minHeight: "100vh",
    padding: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "Arial",
    color: "white",
  }}
   >
      <h1
      style={{
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "38px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}
>   </h1>
      <h1
  style={{
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "white",
    letterSpacing: "1px",
  }}
>
  📢 Notice Board Management System
</h1>
      <div
          style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "30px",
        }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
          }}
        />

        <textarea
          name="body"
          placeholder="Notice Content"
          value={formData.body}
          onChange={handleChange}
          required
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
          }}
        />

  <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "10px",
  color: "white",
  fontSize: "16px",
  }}
>
    <option value="" style={{ color: "black" }}>
      Select Category
    </option>
    <option value="Academic" style={{ color: "black" }}>
      Academic
    </option>
    <option value="Event" style={{ color: "black" }}>
      Event
    </option>
    <option value="General" style={{ color: "black" }}>
      General
    </option>
  </select>
  
  <select
      name="priority"
      value={formData.priority}
      onChange={handleChange}
      required
      style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "10px",
          color: "white",
          fontSize: "16px",
      }}
    >
    <option value="" style={{ color: "black" }}>
      Select Priority
    </option>
    <option value="Urgent" style={{ color: "black" }}>
      Urgent
    </option>
    <option value="Normal" style={{ color: "black" }}>
      Normal
    </option>
    </select>

        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
            }}
        />

        <br />

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: editingId ? "green" : "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {editingId ? "Update Notice" : "Add Notice"}
        </button>
        {editingId && (
  <button
    type="button"
    onClick={() => {
      setEditingId(null);

      setFormData({
        title: "",
        body: "",
        category: "",
        priority: "",
        publishDate: "",
      });
    }}
    style={{
      marginLeft: "10px",
      padding: "12px 20px",
      backgroundColor: "gray",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Cancel Edit
  </button>
  )}
      </form>
       </div>
      

      <hr style={{ margin: "40px 0" }} />
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "30px",
  }}
>
  <div
  style={{
    flex: 1,
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    color: "white",
  }}
  >
    <h3>{totalNotices}</h3>
    <p>Total Notices</p>
  </div>

  <div
    style={{
      backgroundColor: "red",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      color: "white",
    }}
  >
    <h3>{urgentNotices}</h3>
    <p>Urgent</p>
  </div>

  <div
    style={{
      backgroundColor: "#0070f3",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      color: "white",
    }}
  >
    <h3>{academicNotices}</h3>
    <p>Academic</p>
  </div>

  <div
    style={{
      backgroundColor: "#8a2be2",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      color: "white",
    }}
  >
    <h3>{eventNotices}</h3>
    <p>Events</p>
  </div>
   </div>

      <h2>📋 All Notices</h2>
      <input
      type="text"
      placeholder="Search notices..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "15px",
        marginBottom: "20px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "10px",
        color: "white",
        fontSize: "16px",
        outline: "none",
      }}
    />
    <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "10px",
  color: "white",
  }}
>
  <option value="" style={{ color: "black" }}>
  Select Category
</option>
<option value="Academic" style={{ color: "black" }}>
  Academic
</option>
<option value="Event" style={{ color: "black" }}>
  Event
</option>
<option value="General" style={{ color: "black" }}>
  General
</option>
  </select>
    <p
   style={{
    marginBottom: "20px",
    color: "#aaa",
  }}
>
  Total Notices: {
  notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      notice.category === categoryFilter;

    return matchesSearch && matchesCategory;
  }).length
}
  </p>

      {notices
  .filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      notice.category === categoryFilter;

    return matchesSearch && matchesCategory;
  }).length === 0 ? (
    <p
      style={{
        textAlign: "center",
        color: "#888",
        fontSize: "20px",
        padding: "30px",
      }}
    >
      📭 No notices found
    </p>
      ) : (
         notices
        .filter((notice) => {
  const matchesSearch =
    notice.title.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    notice.category === categoryFilter;

  return matchesSearch && matchesCategory;
})
   .map((notice, index) => (
          <div
            key={notice.id}
            style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "20px",
          }}
          >
          <div
    style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>
  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <h3>{notice.title}</h3>

  {index === 0 && (
    <span
      style={{
        backgroundColor: "#00c853",
        color: "white",
        padding: "4px 10px",
        borderRadius: "5px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      🆕 Latest
    </span>
  )}
</div>

  {notice.priority === "Urgent" && (
    <span
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      URGENT
    </span>
  )}
</div>

            <p>
              <strong>Content:</strong> {notice.body}
            </p>

            <p>
          <strong>Category:</strong>{" "}
         <span
          style={{
            backgroundColor:
              notice.category === "Academic"
                ? "#0070f3"
                : notice.category === "Event"
                ? "#8a2be2"
                : "#28a745",
            color: "white",
            padding: "4px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {notice.category}
        </span>
      </p>

            <p>
              <strong>Priority:</strong> {notice.priority}
            </p>

            <p>
              <strong>Publish Date:</strong>{" "}
              {new Date(notice.publishDate).toLocaleDateString()}
            </p>
            <button
          onClick={() => {
          setEditingId(notice.id);

          setFormData({
            title: notice.title,
            body: notice.body,
            category: notice.category,
            priority: notice.priority,
            publishDate: notice.publishDate.split("T")[0],
          });
        }}
        style={{
          marginTop: "10px",
          marginRight: "10px",
          padding: "8px 15px",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Edit Notice
      </button>

            <button
              onClick={() => deleteNotice(notice.id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete Notice
            </button>
          </div>
        ))
      )}
            <hr style={{ marginTop: "40px" }} />

      <p
        style={{
          textAlign: "center",
          color: "#888",
          marginTop: "20px",
        }}
      >
        Notice Board Management System © 2026
      </p>
    </div>
  );
}
