import React, { useState, useEffect } from 'react';
import { Users, Plus, Crown, Target, Award } from 'lucide-react';
import { User, Challenge, Household } from '../types';
import { useApp, useTranslation } from '../contexts/AppContext';
import { calculateBadges, calculatePoints } from '../utils/badgeSystem';

const FamilyPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Load challenges from localStorage
    const savedChallenges = localStorage.getItem('familyChallenges');
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    } else {
      // Initialize with default challenges
      const defaultChallenges: Challenge[] = [
        {
          id: '1',
          title: 'LED Light Switch',
          description: 'Replace 5 incandescent bulbs with LED bulbs',
          category: 'energy',
          points: 50,
          duration: 7,
          target: 5,
          completed: false,
        },
        {
          id: '2',
          title: 'Bike to Work Week',
          description: 'Use bicycle or public transport for commuting',
          category: 'transport',
          points: 75,
          duration: 7,
          target: 5,
          completed: false,
        },
        {
          id: '3',
          title: 'Meatless Monday',
          description: 'Have vegetarian meals for 4 Mondays',
          category: 'diet',
          points: 40,
          duration: 28,
          target: 4,
          completed: false,
        },
      ];
      setChallenges(defaultChallenges);
      localStorage.setItem('familyChallenges', JSON.stringify(defaultChallenges));
    }
  }, []);

  const addFamilyMember = () => {
    if (!newMemberName.trim()) return;

    const newMember: User = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
      role: 'member',
    };

    const currentHousehold = state.currentHousehold || {
      id: 'default',
      name: 'My Household',
      members: [],
      monthlyEntries: [],
      badges: [],
      totalPoints: 0,
    };

    const updatedHousehold: Household = {
      ...currentHousehold,
      members: [...currentHousehold.members, newMember],
    };

    dispatch({ type: 'SET_HOUSEHOLD', payload: updatedHousehold });
    setNewMemberName('');
    setShowAddMember(false);
  };

  const assignChallenge = (challengeId: string, memberId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const assignedTo = challenge.assignedTo || [];
        if (assignedTo.includes(memberId)) {
          return {
            ...challenge,
            assignedTo: assignedTo.filter(id => id !== memberId),
          };
        } else {
          return {
            ...challenge,
            assignedTo: [...assignedTo, memberId],
          };
        }
      }
      return challenge;
    });

    setChallenges(updatedChallenges);
    localStorage.setItem('familyChallenges', JSON.stringify(updatedChallenges));
  };

  const completeChallenge = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return { ...challenge, completed: true };
      }
      return challenge;
    });

    setChallenges(updatedChallenges);
    localStorage.setItem('familyChallenges', JSON.stringify(updatedChallenges));
  };

  const getCategoryIcon = (category: Challenge['category']) => {
    switch (category) {
      case 'energy': return '⚡';
      case 'transport': return '🚗';
      case 'diet': return '🍽️';
      default: return '🌱';
    }
  };

  const getCategoryColor = (category: Challenge['category']) => {
    switch (category) {
      case 'energy': return 'bg-yellow-100 text-yellow-800';
      case 'transport': return 'bg-blue-100 text-blue-800';
      case 'diet': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const household = state.currentHousehold || {
    id: 'default',
    name: 'My Household',
    members: [],
    monthlyEntries: [],
    badges: [],
    totalPoints: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Family Carbon Challenge
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Work together as a family to reduce your carbon footprint
          </p>
        </div>

        {/* Household Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Family Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {household.members.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {household.totalPoints}
                </p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Challenges</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {challenges.filter(c => !c.completed).length}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Family Members */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Family Members
            </h2>
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </button>
          </div>

          {household.members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No family members added yet. Add your first member to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {household.members.map((member) => (
                <div key={member.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {member.role === 'admin' && (
                          <Crown className="h-3 w-3 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Family Challenges
          </h2>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`border rounded-lg p-6 ${
                  challenge.completed
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                        {challenge.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>🏆 {challenge.points} points</span>
                      <span>⏱️ {challenge.duration} days</span>
                      <span>🎯 Target: {challenge.target}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {!challenge.completed && (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Complete
                      </button>
                    )}
                    {challenge.completed && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                        ✅ Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* Assigned Members */}
                {household.members.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assigned to:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {household.members.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => assignChallenge(challenge.id, member.id)}
                          className={`px-3 py-1 text-sm rounded-full transition-all ${
                            challenge.assignedTo?.includes(member.id)
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {member.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Add Family Member
              </h3>
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Enter member name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white mb-4"
                onKeyPress={(e) => e.key === 'Enter' && addFamilyMember()}
              />
              <div className="flex space-x-4">
                <button
                  onClick={addFamilyMember}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Member
                </button>
                <button
                  onClick={() => {
                    setShowAddMember(false);
                    setNewMemberName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyPage;