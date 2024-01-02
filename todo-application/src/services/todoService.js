import axios from 'axios';

class todoService {
  static async getTodos() {
    return await axios.get('http://localhost:4000/todos');
  }

  static async insertTodo(todoData) {
    return await axios.post('http://localhost:4000/todos/',{
      task:todoData
    });
  }

  static async toggleTodo(id) {
    return await axios.put('http://localhost:4000/todos/'+id);
  }

  static async deleteTodo(id) {
    return await axios.delete('http://localhost:4000/todos/'+id);
  }
}

export default todoService;
