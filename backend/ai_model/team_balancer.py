import requests
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
import random

def balance_teams_by_credits():
    """Automatically create balanced teams based on credits and skills"""
    try:
        # Fetch players from API
        response = requests.get('http://localhost:5000/api/players')
        players = response.json()
        
        if len(players) < 2:
            print("Need at least 2 players to create teams")
            return None
            
        # Sort players by total value (skill + credits)
        players_sorted = sorted(players, key=lambda p: p['skill'] + p['credits'], reverse=True)
        
        team_a = []
        team_b = []
        credits_a = 200
        credits_b = 200
        
        # Distribute players alternately, checking credit limits
        for i, player in enumerate(players_sorted):
            player_cost = player['credits']
            
            # Try to add to team with more credits available
            if credits_a >= credits_b:
                if credits_a >= player_cost:
                    team_a.append(player)
                    credits_a -= player_cost
                elif credits_b >= player_cost:
                    team_b.append(player)
                    credits_b -= player_cost
            else:
                if credits_b >= player_cost:
                    team_b.append(player)
                    credits_b -= player_cost
                elif credits_a >= player_cost:
                    team_a.append(player)
                    credits_a -= player_cost
        
        # Calculate team stats
        team_a_stats = calculate_team_stats(team_a)
        team_b_stats = calculate_team_stats(team_b)
        
        result = {
            'team_a': {
                'players': team_a,
                'remaining_credits': credits_a,
                'stats': team_a_stats
            },
            'team_b': {
                'players': team_b,
                'remaining_credits': credits_b,
                'stats': team_b_stats
            },
            'balance_score': calculate_balance_score(team_a_stats, team_b_stats)
        }
        
        # Remove console prints for JSON output
        
        return result
        
    except Exception as e:
        print(f"Error balancing teams: {e}")
        return None

def calculate_team_stats(team):
    """Calculate team statistics"""
    if not team:
        return {'avg_skill': 0, 'avg_age': 0, 'total_credits': 0, 'player_count': 0}
        
    avg_skill = sum(p['skill'] for p in team) / len(team)
    avg_age = sum(p['age'] for p in team) / len(team)
    total_credits = sum(p['credits'] for p in team)
    
    return {
        'avg_skill': round(avg_skill, 2),
        'avg_age': round(avg_age, 2),
        'total_credits': total_credits,
        'player_count': len(team)
    }

def calculate_balance_score(stats_a, stats_b):
    """Calculate how balanced the teams are (0-1, higher is better)"""
    if stats_a['player_count'] == 0 or stats_b['player_count'] == 0:
        return 0
        
    skill_diff = abs(stats_a['avg_skill'] - stats_b['avg_skill'])
    credit_diff = abs(stats_a['total_credits'] - stats_b['total_credits'])
    player_diff = abs(stats_a['player_count'] - stats_b['player_count'])
    
    # Normalize differences (lower is better)
    skill_balance = max(0, 1 - skill_diff / 10)
    credit_balance = max(0, 1 - credit_diff / 200)
    player_balance = max(0, 1 - player_diff / 10)
    
    return (skill_balance + credit_balance + player_balance) / 3

if __name__ == "__main__":
    result = balance_teams_by_credits()
    if result:
        import json
        print(json.dumps(result, indent=2))