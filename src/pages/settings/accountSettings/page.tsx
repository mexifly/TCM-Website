import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import classes from "../../ContentPage.module.css";

function AccountSettingsPage() {
  const handleModify = (itemId: number) => {
    // TODO 修改操作
    console.log(`Modify item with ID: ${itemId}`);
  };

  const handleDelete = (itemId: number) => {
    // TODO 删除操作
    console.log(`Delete item with ID: ${itemId}`);
  };

  //测试数据 Test Data
  const items = [
    { id: 1, name: "Andy", description: "Admin" },
    { id: 2, name: "Lily", description: "Admin" },
    {
      id: 3,
      name: "Mike",
      description: "Admin",
    },
    {
      id: 4,
      name: "Cindy",
      description: "Admin",
    },
    {
      id: 5,
      name: "Jack",
      description: "Admin",
    },
    {
      id: 6,
      name: "Fairleigh",
      description: "Admin",
    },
    {
      id: 7,
      name: "Dickinson",
      description: "Admin",
    },
  ];

  return (
    <div className={classes.testmanagementpage}>
      <Header />
      <div className={classes.content}>
        <div className={classes.sidebarandmaincontent}>
          <Sidebar />
          <div className={classes.maincontent}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>User Name</th>
                  <th style={thStyle}>Permission</th>
                  <th style={thStyle}>Modify</th>
                  <th style={thStyle}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.description}</td>
                    <td style={buttonColumnStyle}>
                      <button
                        style={buttonStyleModify}
                        onClick={() => handleModify(item.id)}
                      >
                        Modify
                      </button>
                    </td>
                    <td style={buttonColumnStyle}>
                      <button
                        style={buttonStyleDelete}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 定义内联样式 Define inline style
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  textAlign: "left",
  padding: "10px",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "10px",
};

const buttonColumnStyle: React.CSSProperties = {
  width: "120px", // Adjust the width as needed
};

const buttonStyleModify: React.CSSProperties = {
  backgroundColor: "#00b300",
  color: "#fff",
  border: "none",
  padding: "2px 3px", // 调整按钮的大小
  cursor: "pointer",
  borderRadius: "4px", // 添加圆角
};

const buttonStyleDelete: React.CSSProperties = {
  backgroundColor: "#ff3333",
  color: "#fff",
  border: "none",
  padding: "2px 3px",
  cursor: "pointer",
  borderRadius: "4px",
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#2980b9",
};

export default AccountSettingsPage;
