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

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
