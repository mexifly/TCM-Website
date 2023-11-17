const express = require('express');
const mysql = require('mysql2');
const argon2 = require('argon2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public')); // 确保此目录存在
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({ storage: storage });

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qweasdzxc',
  database: 'admin'
});




app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    pool.query('SELECT * FROM admininfo WHERE adminEmail = ?', [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const user = results[0];
            argon2.verify(user.adminPassword, password)
                .then(valid => {
                    if (valid) {
                        res.json({ message: 'Login successful', user });
                    } else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                })
                .catch(verifyError => {
                    console.error('Error during password verification:', verifyError);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});


app.post('/uploadLogo', upload.single('logo'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ error: 'Please upload a file.' });
    }
    
    // 创建文件信息对象
    const newLogo = {
        adminId: 0, // 假设管理员ID是1
        name: file.filename,
        description: 'Website Logo',
        type: 'logo',
        size: file.size,
        path: `/${file.filename}`, // 文件保存在public/uploads目录下
        status: 'active'
    };
    
    // 删除type为'logo'的所有现有记录
    pool.query('DELETE FROM files WHERE type = ?', ['logo'], (deleteErr, deleteResult) => {
        if (deleteErr) {
            console.error('Error deleting old logos:', deleteErr);
            return res.status(500).json({ error: 'Internal Server Error while deleting old logos' });
        }
        
        // 现有logo已删除，现在插入新logo
        pool.query('INSERT INTO files SET ?', newLogo, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting new logo:', insertErr);
                return res.status(500).json({ error: 'Internal Server Error while inserting new logo' });
            }
            // 返回给前端的是新logo的相对路径
            res.json({ logoUrl: newLogo.path });
        });
    });
});



  
  // 获取当前logo
  app.get('/currentLogo', (req, res) => {
    pool.query('SELECT * FROM files WHERE type = "logo"', (err, results) => {
      if (err) {
        console.error('Error fetching logo:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // 如果数据库中有logo记录，则发送图片的URL
      if (results.length > 0) {
        const logoPath = results[0].path;
        res.json({ logoUrl: logoPath }); // 需要确保public目录已经作为静态资源服务
      } else {
        res.status(404).json({ error: 'No logo found' });
      }
    });
  });

  app.get('/api/admin/:adminId/info', (req, res) => {
    const adminId = req.params.adminId;

    pool.query('SELECT adminId,adminFirstName, adminLastName, adminEmail, adminAddress, adminPhoneNumber FROM admininfo WHERE adminId = ?', [adminId], (err, results) => {
        if (err) {
            console.error('Error fetching admin data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    });
});

app.get('/api/admin/:adminId/photo', (req, res) => {
    const adminId = req.params.adminId;

    pool.query('SELECT avatar FROM admininfo WHERE adminId = ?', [adminId], (err, results) => {
        if (err) {
            console.error('Error fetching admin photo:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length > 0 && results[0].avatar) {
            res.json({ photoUrl: results[0].avatar });
        } else {
            res.status(404).json({ error: 'Photo not found' });
        }
    });
});



  app.post('/uploadAdminPhoto', upload.single('photo'), (req, res) => {
    const adminId = req.body.adminId; // Extracting the admin ID from the request body
    const file = req.file;

    if (!file) {
        return res.status(400).send({ error: 'Please upload a photo.' });
    }

    // Create a new file record
    const newFile = {
        adminId: adminId,
        name: file.filename,
        description: 'Admin Photo',
        type: 'photo',
        size: file.size,
        path: `/${file.filename}`, // File path
        status: 'active'
    };

    // First, delete any existing records for the same adminId in the files table
    pool.query('DELETE FROM files WHERE adminId = ?', [adminId], (deleteErr, deleteResult) => {
        if (deleteErr) {
            console.error('Error deleting old files:', deleteErr);
            return res.status(500).json({ error: 'Internal Server Error while deleting old files' });
        }

        // Insert the new file record into the database
        pool.query('INSERT INTO files SET ?', newFile, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting new file:', insertErr);
                return res.status(500).json({ error: 'Internal Server Error while inserting new file' });
            }

            // Update the avatar URL in the admininfo table
            pool.query('UPDATE admininfo SET avatar = ? WHERE adminId = ?', [newFile.path, adminId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating admin avatar:', updateErr);
                    return res.status(500).json({ error: 'Internal Server Error while updating admin avatar' });
                }
                res.json({ message: 'Photo uploaded and avatar updated successfully', filePath: newFile.path });
            });
        });
    });
});

app.get('/api/admins', (req, res) => {
    pool.query('SELECT adminId, adminFirstName, adminLastName, adminEmail, adminAddress, adminPhoneNumber FROM admininfo', (err, results) => {
        if (err) {
            console.error('Error fetching admin data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});


app.post('/api/admin/updateInfo', (req, res) => {
    const { adminId, adminFirstName, adminLastName, adminEmail, adminAddress, adminPhoneNumber } = req.body;
    console.log(req.body);
    // 确保所有必要的字段都被提供
    if (!adminId || !adminFirstName || !adminLastName || !adminEmail) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    

    // 构造更新查询
    const updateQuery = `
        UPDATE admininfo 
        SET 
            adminFirstName = ?, 
            adminLastName = ?, 
            adminEmail = ?, 
            adminAddress = ?, 
            adminPhoneNumber = ?
        WHERE adminId = ?`;

    // 执行更新操作
    pool.query(updateQuery, [adminFirstName, adminLastName, adminEmail, adminAddress, adminPhoneNumber, adminId], (err, results) => {
        if (err) {
            console.error('Error updating admin info:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            // 没有找到对应的记录进行更新
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.json({ message: 'Admin information updated successfully' });
    });
});

app.delete('/deleteAdmin/:adminId', (req, res) => {
    const adminId = req.params.adminId;

    pool.query('DELETE FROM admininfo WHERE adminId = ?', [adminId], (err, result) => {
        if (err) {
            console.error('Error deleting admin:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            // No rows affected means no record was found with that ID
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.json({ message: `Admin with ID ${adminId} deleted successfully` });
    });
});

app.post('/api/change-password', async (req, res) => {
    const { adminId, currentPassword, newPassword } = req.body;

    if (!adminId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const queryResult = await pool.promise().query('SELECT adminPassword FROM admininfo WHERE adminId = ?', [adminId]);
        const users = queryResult[0];

        if (users.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const user = users[0];

        const validPassword = await argon2.verify(user.adminPassword, currentPassword);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        const hashedPassword = await argon2.hash(newPassword);
        await pool.promise().query('UPDATE admininfo SET adminPassword = ? WHERE adminId = ?', [hashedPassword, adminId]);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error during password update:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/Add_New_Admin', upload.single('adminPhoto'), async (req, res) => {
    try {
        // 解构请求体中的数据
        const { adminFirstName, adminLastName, adminEmail, adminPassword, adminAddress, adminPhoneNumber } = req.body;
        
        // 验证必要字段
        if (!adminFirstName || !adminLastName || !adminEmail || !adminPassword) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 使用 Argon2 加密密码
        const hashedPassword = await argon2.hash(adminPassword);

        // 将管理员信息插入到 admininfo 表中
        const insertAdminResult = await pool.promise().query('INSERT INTO admininfo (adminFirstName, adminLastName, adminEmail, adminPassword, adminAddress, adminPhoneNumber) VALUES (?, ?, ?, ?, ?, ?)', [adminFirstName, adminLastName, adminEmail, hashedPassword, adminAddress, adminPhoneNumber]);
        const adminId = insertAdminResult[0].insertId;

        // 处理上传的头像文件
        if (req.file) {
            const file = req.file;
            const newFile = {
                adminId: adminId,
                name: file.filename,
                description: 'Admin Photo',
                type: 'photo',
                size: file.size,
                path: `/${file.filename}`,
                status: 'active'
            };

            // 将文件信息插入到 files 表中
            await pool.promise().query('INSERT INTO files SET ?', newFile);

            // 更新 admininfo 表中的 avatar 字段
            await pool.promise().query('UPDATE admininfo SET avatar = ? WHERE adminId = ?', [newFile.path, adminId]);
        }

        res.json({ message: 'Admin added successfully', adminId: adminId });
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all questions
app.get("/questions", (req, res) => {
    const query = "SELECT * FROM questions";
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Get question failed:", err);
        res.status(500).json({ error: "Unable to get question" });
        return;
      }
      res.json(results);
    });
  });
  
  // Get one question by questionId
  app.get("/questions/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const query = "SELECT * FROM questions WHERE questionId = ?";
    pool.query(query, [questionId], (err, results) => {
      if (err) {
        console.error("Get question failed:", err);
        res.status(500).json({ error: "Unable to get question" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "问题不存在 Unable to get question" });
        return;
      }
      res.json(results[0]);
    });
  });
  
  // Update question
  app.put("/questions/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const { questionContent, type } = req.body;
    const query =
      "UPDATE questions SET questionContent = ?, type = ? WHERE questionId = ?";
  
    pool.query(query, [questionContent, type, questionId], (err, result) => {
      if (err) {
        console.error("Update question failed:", err);
        res.status(500).json({ error: "无法更新问题 Unable to update question" });
        return;
      }
      res.json({ message: "更新成功 Update question successfully" });
    });
  });
  
  // Get all constitution_results
  app.get("/constitution_results", (req, res) => {
    const query = "SELECT * FROM constitution_results";
    pool.query(query, (err, results) => {
      if (err) {
        console.error("获取失败 Get constitution_results failed:", err);
        res
          .status(500)
          .json({ error: "无法更新 Unable to get constitution_results" });
        return;
      }
      res.json(results);
    });
  });
  
  // 获取单个constitution_results
  app.get("/constitution_results/:consId", (req, res) => {
    const consId = req.params.consId;
    const query = "SELECT * FROM constitution_results WHERE consId = ?";
    pool.query(query, [consId], (err, results) => {
      if (err) {
        console.error("获取失败 Get constitution_results failed:", err);
        res.status(500).json({
          error:
            "无法获取constitution_results Unable to get constitution_results",
        });
        return;
      }
      if (results.length === 0) {
        res
          .status(404)
          .json({ error: "记录不存在 Unable to get constitution_results" });
        return;
      }
      res.json(results[0]);
    });
  });
  
  // Update constitution_results
  app.put("/constitution_results/:consId", (req, res) => {
    const consId = req.params.consId;
    const {
      consType,
      definition,
      disturbance,
      cause,
      vigilant,
      improvement,
      recommondRecipe,
    } = req.body;
  
    const query =
      "UPDATE constitution_results SET consType = ?, definition = ?, disturbance = ?, cause = ?, vigilant = ?, improvement = ?, recommondRecipe = ? WHERE consId = ?";
    pool.query(
      query,
      [
        consType,
        definition,
        disturbance,
        cause,
        vigilant,
        improvement,
        recommondRecipe,
        consId,
      ],
      (err, result) => {
        if (err) {
          console.error("更新失败 Update constitution_results failed:", err);
          res.status(500).json({
            error:
              "Unable to Update constitution_results 无法更新 constitution_results",
          });
          return;
        }
        res.json({ message: "记录已成功更新 Update successfully" });
      }
    );
  });


app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
