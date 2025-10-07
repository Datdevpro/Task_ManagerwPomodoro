'''
Dùng Pydantic để kiểm tra dữ liệu client gửi lên.

TodoBase: định nghĩa trường cơ bản của Todo (title, description, completed).

TodoCreate: dùng khi tạo mới (chỉ cần kế thừa).

Todo: dùng khi trả dữ liệu về cho client (có thêm id).

orm_mode = True: cho phép Pydantic hiểu dữ liệu từ SQLAlchemy ORM (class Todo) và tự động convert thành JSON trả về
'''

from pydantic import BaseModel

class TodoBase(BaseModel):
    title : str
    description: str | None  = None 
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int 
    class Config: 
        orm_mode = True