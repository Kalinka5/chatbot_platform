import mysql.connector
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

load_dotenv()

# MySQL connection configuration
mysql_config = {
    'host': os.getenv('MYSQL_HOST'),
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'database': os.getenv('MYSQL_DATABASE')
}


# Establish MySQL connection
def get_mysql_connection():
    return mysql.connector.connect(**mysql_config)


# Retrieve all chats for a given session_id and chatbot_id, sorted by last_update_time (most recent first)
def get_chats(session_id: str, chatbot_id: str):
    connection = get_mysql_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Find the chatbot id in table chatbots
        cursor.execute(
            "SELECT id FROM chatbots WHERE chatbot_id = %s", (chatbot_id,))
        chatbot_id = cursor.fetchone()['id']

        # Fetch all chats for the given session_id and chatbot_id
        query = """
        SELECT c.id AS chat_id, c.title, c.last_update_time, cc.name, cc.message
        FROM sessions s
        JOIN chats c ON s.id = c.session_id
        JOIN chat_content cc ON c.id = cc.chat_id
        WHERE s.session_id = %s AND s.chatbot_id = %s
        ORDER BY c.last_update_time DESC
        """
        cursor.execute(query, (session_id, chatbot_id))
        rows = cursor.fetchall()

        # Organize chats by title
        chats = {}
        for row in rows:
            if row['title'] not in chats:
                chats[row['title']] = {
                    'title': row['title'],
                    'content': [],
                    'last_update_time': row['last_update_time']
                }
            chats[row['title']]['content'].insert(0, {
                'name': row['name'],
                'message': row['message']
            })

        # Convert dictionary to list and sort by last_update_time
        all_chats = sorted(
            chats.values(), key=lambda x: x['last_update_time'], reverse=True)
        return all_chats
    finally:
        cursor.close()
        connection.close()


# Add a new message to an existing chat or create a new chat for a specific chatbot
def add_message(session_id: str, chatbot_id: str, new_message: dict):
    connection = get_mysql_connection()
    cursor = connection.cursor()

    try:
        current_time = datetime.now(timezone.utc)

        # Find the chatbot id in table chatbots
        cursor.execute(
            "SELECT id FROM chatbots WHERE chatbot_id = %s", (chatbot_id,))
        chatbot_id = cursor.fetchone()[0]

        # Check if the session and chatbot exist
        cursor.execute(
            "SELECT id FROM sessions WHERE session_id = %s AND chatbot_id = %s", (session_id, chatbot_id))
        message_row = cursor.fetchone()

        if message_row:
            message_id = message_row[0]

            # Check if the chat title exists
            cursor.execute("SELECT id FROM chats WHERE session_id = %s AND title = %s",
                           (message_id, new_message.title))
            chat_row = cursor.fetchone()

            if chat_row:
                chat_id = chat_row[0]
                # Update the chat with the new message
                cursor.execute(
                    "INSERT INTO chat_content (chat_id, name, message) VALUES (%s, %s, %s)",
                    (chat_id, new_message.content['name'],
                     new_message.content['message'])
                )
                # Update last_update_time for the chat
                cursor.execute(
                    "UPDATE chats SET last_update_time = %s WHERE id = %s",
                    (current_time, chat_id)
                )
            else:
                # Create a new chat with the title
                cursor.execute(
                    "INSERT INTO chats (session_id, title, last_update_time) VALUES (%s, %s, %s)",
                    (message_id, new_message.title, current_time)
                )
                chat_id = cursor.lastrowid
                # Add the new message to the chat
                cursor.execute(
                    "INSERT INTO chat_content (chat_id, name, message) VALUES (%s, %s, %s)",
                    (chat_id, new_message.content['name'],
                     new_message.content['message'])
                )
        else:
            # Create a new session with the first chat
            cursor.execute(
                "INSERT INTO sessions (session_id, chatbot_id) VALUES (%s, %s)",
                (session_id, chatbot_id)
            )
            message_id = cursor.lastrowid
            # Create the first chat
            cursor.execute(
                "INSERT INTO chats (session_id, title, last_update_time) VALUES (%s, %s, %s)",
                (message_id, new_message.title, current_time)
            )
            chat_id = cursor.lastrowid
            # Add the new message to the chat
            cursor.execute(
                "INSERT INTO chat_content (chat_id, name, message) VALUES (%s, %s, %s)",
                (chat_id, new_message.content['name'],
                 new_message.content['message'])
            )

        connection.commit()
    finally:
        cursor.close()
        connection.close()


# Delete a specific chat from a user's session for a specific chatbot by chat title
def delete_chat(session_id: str, chatbot_id: str, chat_title: str):
    connection = get_mysql_connection()
    cursor = connection.cursor()

    try:
        # Find the chatbot id in table chatbots
        cursor.execute(
            "SELECT id FROM chatbots WHERE chatbot_id = %s", (chatbot_id,))
        chatbot_id = cursor.fetchone()[0]
        print(chatbot_id)

        # Find the message_id for the session and chatbot
        cursor.execute(
            "SELECT id FROM sessions WHERE session_id = %s AND chatbot_id = %s", (session_id, chatbot_id))
        message_row = cursor.fetchone()

        if message_row:
            message_id = message_row[0]

            # Find the chat_id for the given title
            cursor.execute(
                "SELECT id FROM chats WHERE session_id = %s AND title = %s", (message_id, chat_title))
            chat_row = cursor.fetchone()

            if chat_row:
                chat_id = chat_row[0]
                # Delete all chat_content for the chat
                cursor.execute(
                    "DELETE FROM chat_content WHERE chat_id = %s", (chat_id,))
                # Delete the chat
                cursor.execute("DELETE FROM chats WHERE id = %s", (chat_id,))
                connection.commit()
                return True  # Successfully deleted the chat
            else:
                return False  # Chat title not found
        else:
            return False  # Session or chatbot not found
    finally:
        cursor.close()
        connection.close()


# Delete all chats from a user's session for a specific chatbot
def delete_all_chats(session_id: str, chatbot_id: str):
    connection = get_mysql_connection()
    cursor = connection.cursor()

    try:
        # Find the chatbot id in table chatbots
        cursor.execute(
            "SELECT id FROM chatbots WHERE chatbot_id = %s", (chatbot_id,))
        chatbot_id = cursor.fetchone()[0]

        # Find the message_id for the session and chatbot
        cursor.execute(
            "SELECT id FROM sessions WHERE session_id = %s AND chatbot_id = %s", (session_id, chatbot_id))
        message_row = cursor.fetchone()

        if message_row:
            message_id = message_row[0]

            # Find all chat_ids for the message
            cursor.execute(
                "SELECT id FROM chats WHERE session_id = %s", (message_id,))
            chat_rows = cursor.fetchall()

            # Delete all chat_content and chats
            for chat_row in chat_rows:
                chat_id = chat_row[0]
                cursor.execute(
                    "DELETE FROM chat_content WHERE chat_id = %s", (chat_id,))
                cursor.execute("DELETE FROM chats WHERE id = %s", (chat_id,))

            # Delete the message
            cursor.execute("DELETE FROM sessions WHERE id = %s", (message_id,))
            connection.commit()
            return True  # Successfully deleted all chats
        else:
            return False  # Session or chatbot not found
    finally:
        cursor.close()
        connection.close()
