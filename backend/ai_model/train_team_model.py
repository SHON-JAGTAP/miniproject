import requests
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib
import random

def create_sample_data():
    """Create sample player data for training"""
    positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']
    names = ['John', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 
             'Jack', 'Kate', 'Leo', 'Mia', 'Nick', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Sam']
    
    sample_data = []
    for i, name in enumerate(names):
        sample_data.append({
            'id': i + 1,
            'name': name,
            'age': random.randint(18, 35),
            'experience': random.randint(0, 15),
            'position': random.choice(positions),
            'skill': random.randint(3, 10),
            'credits': random.randint(20, 90)
        })
    
    return sample_data

def train_model():
    try:
        # Fetch player data from backend API
        try:
            response = requests.get('http://localhost:5000/api/players')
            data = response.json()
        except:
            data = []
        
        # If no data or insufficient data, create sample data
        if not data or len(data) < 10:
            print("Insufficient data, creating sample dataset...")
            data = create_sample_data()
            print(f"Created {len(data)} sample players")
            
        # Convert to DataFrame
        df = pd.DataFrame(data)
        
        # Create target variable based on player performance
        df['performance_class'] = df.apply(
            lambda row: 'high' if row['skill'] > 7 and row['credits'] > 50 else 'low', 
            axis=1
        )
        
        # Encode categorical variables
        le_position = LabelEncoder()
        df['position_encoded'] = le_position.fit_transform(df['position'])
        
        le_class = LabelEncoder()
        df['class_encoded'] = le_class.fit_transform(df['performance_class'])
        
        # Features and target
        X = df[['skill', 'credits', 'age', 'experience', 'position_encoded']]
        y = df['class_encoded']
        
        print(f"Training with {len(X)} samples")
        
        # Check if we have enough data for splitting
        if len(X) < 5:
            print(f"Not enough data for training. Need at least 5 samples, got {len(X)}")
            return None
            
        # Adjust test_size based on data size
        test_size = 0.2 if len(X) >= 10 else 1/len(X)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
        
        # Use RandomForest
        clf = RandomForestClassifier(n_estimators=50, max_depth=3, random_state=42)
        clf.fit(X_train, y_train)
        
        # Evaluate
        y_pred = clf.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Model Accuracy: {accuracy:.2f}")
        
        # Save model
        joblib.dump(clf, 'team_balance_model.pkl')
        joblib.dump(le_position, 'position_encoder.pkl')
        
        print("Model trained and saved successfully!")
        return clf
        
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    train_model()