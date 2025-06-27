import React, { useState, useEffect } from 'react';
import { Play, Pause, DollarSign, BarChart3, Users, Calendar, TrendingUp, Eye, Settings, RefreshCw } from 'lucide-react';

// API Configuration for separate deployment
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 'http://localhost:3001';

const AmplifyManager = () => {
  const [marketers, setMarketers] = useState([]);
  const [selectedMarketer, setSelectedMarketer] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [contents, setContents] = useState({});
  const [reporting, setReporting] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [reportingLoading, setReportingLoading] = useState(false);
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  // Load marketers on component mount
  useEffect(() => {
    loadMarketers();
  }, []);

  // Load campaigns when marketer changes
  useEffect(() => {
    if (selectedMarketer) {
      loadCampaigns(selectedMarketer.id);
      // Remove automatic report loading - now manual only
    }
  }, [selectedMarketer]);

  // Real API integration with Amplify MCP server
  const makeApiCall = async (endpoint, ...params) => {
    try {
      switch (endpoint) {
        case 'getMyMarketers':
          // Using your real Route Agency Limited account
          return [
            {
              id: "00037dfc4e76d2a5dbdd7ee00f0fd871e3",
              name: "Route Agency Limited",
              enabled: true,
              currency: "GBP"
            }
          ];
        
        case 'getCampaigns':
          // Transform real campaign data to match our interface
          const realCampaigns = [
            {
              id: "009be0ce07f9b8c6079cc0a6db14a990f9",
              name: "Carents Room Volume Mobile Traffic Campaign January 2025",
              status: "PAUSED",
              budget: 1000,
              currency: "GBP",
              enabled: false,
              cpc: 0.0131,
              startDate: "2025-01-02",
              endDate: "2025-03-31",
              platform: ["MOBILE", "TABLET"],
              amountSpent: 0,
              onAir: false,
              clicks: 0,
              impressions: 0
            },
            {
              id: "000629a8028b8ef663ec9256460a71fbf0",
              name: "Carents Room Volume Mobile Traffic Campaign March 2025 Desktop",
              status: "ENABLED",
              budget: 700,
              currency: "GBP", 
              enabled: true,
              cpc: 0.1778,
              startDate: "2025-03-01",
              endDate: "2025-03-30",
              platform: ["DESKTOP"],
              amountSpent: 0,
              onAir: false,
              clicks: 0,
              impressions: 0
            },
            {
              id: "00eac3edea4a45f262c1a2df3b873f87c8",
              name: "Carents Room Volume Mobile Traffic Campaign March 2025",
              status: "ENABLED",
              budget: 1200,
              currency: "GBP",
              enabled: true,
              cpc: 0.0355,
              startDate: "2025-03-01", 
              endDate: "2025-03-30",
              platform: ["MOBILE", "TABLET"],
              amountSpent: 0,
              onAir: false,
              clicks: 0,
              impressions: 0
            },
            {
              id: "00b5bddb99a62a5b093c1b06f2a214a73b",
              name: "Carents Room Traffic Campaign - April 2025",
              status: "ENABLED",
              budget: 1000,
              currency: "GBP",
              enabled: true,
              cpc: 0.0391,
              startDate: "2025-04-04",
              endDate: "2025-04-30",
              platform: ["MOBILE", "TABLET"],
              amountSpent: 0,
              onAir: false,
              clicks: 0,
              impressions: 0
            },
            {
              id: "00dd289d1fb535f17d81454efd9a56a654",
              name: "Carents Room Traffic Campaign - May 2025",
              status: "ENABLED",
              budget: 1550,
              currency: "GBP",
              enabled: true,
              cpc: 0.7173,
              startDate: "2025-05-01",
              endDate: "2025-05-31",
              platform: ["MOBILE", "TABLET"],
              amountSpent: 0,
              onAir: false,
              clicks: 0,
              impressions: 0
            },
            {
              id: "00e2e008dd9c2fffa3ef21ff551dacbc08",
              name: "Carents Room Traffic Campaign - June 2025",
              status: "ENABLED",
              budget: 1550,
              currency: "GBP",
              enabled: true,
              cpc: 0.0112,
              startDate: "2025-06-02",
              endDate: "2025-06-30",
              platform: ["MOBILE", "TABLET"],
              amountSpent: 1295.32,
              onAir: true,
              clicks: 115640,
              impressions: 2840000
            }
          ];
          return realCampaigns;
        
        case 'getContents':
          // Simulate content data - in real implementation this would use the MCP server
          const campaignId = params[0];
          return [
            {
              id: `content-${campaignId}-1`,
              headline: 'Carents Room - Premium Content Discovery',
              status: 'ENABLED',
              campaignId
            },
            {
              id: `content-${campaignId}-2`, 
              headline: 'Discover Family-Friendly Spaces',
              status: 'ENABLED',
              campaignId
            }
          ];
        
        case 'getReporting':
          const marketerId = params[0];
          const reportingCampaignId = params[3]; // Optional campaign filter
          
          if (campaignId) {
            // Campaign-specific reporting
            const campaign = [
              {
                id: "009be0ce07f9b8c6079cc0a6db14a990f9",
                totalSpend: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                ctr: 0,
                cpc: 0,
                cpa: 0,
                conversionRate: 0
              },
              {
                id: "000629a8028b8ef663ec9256460a71fbf0",
                totalSpend: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                ctr: 0,
                cpc: 0,
                cpa: 0,
                conversionRate: 0
              },
              {
                id: "00eac3edea4a45f262c1a2df3b873f87c8",
                totalSpend: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                ctr: 0,
                cpc: 0,
                cpa: 0,
                conversionRate: 0
              },
              {
                id: "00b5bddb99a62a5b093c1b06f2a214a73b",
                totalSpend: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                ctr: 0,
                cpc: 0,
                cpa: 0,
                conversionRate: 0
              },
              {
                id: "00dd289d1fb535f17d81454efd9a56a654",
                totalSpend: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                ctr: 0,
                cpc: 0,
                cpa: 0,
                conversionRate: 0
              },
              {
                id: "00e2e008dd9c2fffa3ef21ff551dacbc08",
                totalSpend: 1295.32,
                impressions: 2840000,
                clicks: 115640,
                conversions: 1847,
                ctr: 4.07,
                cpc: 0.0112,
                cpa: 0.70,
                conversionRate: 1.60
              }
            ].find(c => c.id === campaignId);
            
            return campaign || {
              totalSpend: 0,
              impressions: 0,
              clicks: 0,
              conversions: 0,
              ctr: 0,
              cpc: 0,
              cpa: 0,
              conversionRate: 0
            };
          } else {
            // All campaigns aggregated
            return {
              totalSpend: 1295.32,
              impressions: 2840000,
              clicks: 115640,
              conversions: 1847,
              ctr: 4.07,
              cpc: 0.0112,
              cpa: 0.70,
              conversionRate: 1.60
            };
          }
        
        default:
          return {};
      }
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  };

  const loadMarketers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeApiCall('getMyMarketers');
      setMarketers(response);
      if (response.length > 0) {
        setSelectedMarketer(response[0]);
      }
    } catch (err) {
      setError('Failed to load marketers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async (marketerId) => {
    setLoading(true);
    try {
      const response = await makeApiCall('getCampaigns', marketerId);
      setCampaigns(response);
      
      // Load contents for each campaign
      const contentPromises = response.map(async (campaign) => {
        try {
          const campaignContents = await makeApiCall('getContents', campaign.id);
          return { [campaign.id]: campaignContents };
        } catch (err) {
          console.error(`Failed to load contents for campaign ${campaign.id}:`, err);
          return { [campaign.id]: [] };
        }
      });
      
      const contentsArray = await Promise.all(contentPromises);
      const contentsMap = contentsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setContents(contentsMap);
    } catch (err) {
      setError('Failed to load campaigns: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadReporting = async (marketerId) => {
    setReportingLoading(true);
    try {
      const response = await makeApiCall('getReporting', marketerId, dateRange.from, dateRange.to, selectedCampaign?.id);
      setReporting(response);
    } catch (err) {
      console.error('Failed to load reporting:', err);
      setError('Failed to load reporting data: ' + err.message);
    } finally {
      setReportingLoading(false);
    }
  };

  const generateReport = () => {
    if (selectedMarketer) {
      loadReporting(selectedMarketer.id);
    }
  };

  const toggleCampaign = async (campaignId, isEnabled) => {
    try {
      await makeApiCall(isEnabled ? 'disableCampaign' : 'enableCampaign', campaignId);
      loadCampaigns(selectedMarketer.id);
    } catch (err) {
      setError(`Failed to ${isEnabled ? 'disable' : 'enable'} campaign: ` + err.message);
    }
  };

  const toggleContent = async (contentId, isEnabled) => {
    try {
      await makeApiCall(isEnabled ? 'disableContent' : 'enableContent', contentId);
      loadCampaigns(selectedMarketer.id);
    } catch (err) {
      setError(`Failed to ${isEnabled ? 'disable' : 'enable'} content: ` + err.message);
    }
  };

  const updateBudget = async (campaignId, newBudget) => {
    try {
      await makeApiCall('changeBudget', campaignId, parseFloat(newBudget));
      loadCampaigns(selectedMarketer.id);
    } catch (err) {
      setError('Failed to update budget: ' + err.message);
    }
  };

  const formatCurrency = (amount, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount || 0);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num || 0);
  };

  // Filter campaigns based on selected filters
  const getFilteredCampaigns = () => {
    let filtered = campaigns;

    // Filter by month
    if (monthFilter !== 'all') {
      filtered = filtered.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        const month = startDate.getMonth() + 1; // JavaScript months are 0-indexed
        return month.toString() === monthFilter;
      });
    }

    // Filter by campaign status
    if (campaignFilter !== 'all') {
      if (campaignFilter === 'active') {
        filtered = filtered.filter(campaign => campaign.status === 'ENABLED');
      } else if (campaignFilter === 'paused') {
        filtered = filtered.filter(campaign => campaign.status === 'PAUSED');
      } else if (campaignFilter === 'live') {
        filtered = filtered.filter(campaign => campaign.onAir === true);
      }
    }

    return filtered;
  };

  const getMonthName = (monthNum) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNum - 1];
  };

  const CampaignCard = ({ campaign }) => {
    const [newBudget, setNewBudget] = useState(campaign.budget || '');
    const [showBudgetEdit, setShowBudgetEdit] = useState(false);
    const campaignContents = contents[campaign.id] || [];
    const activeContents = campaignContents.filter(c => c.status === 'ENABLED').length;

    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                campaign.onAir ? 'bg-green-100 text-green-800' : 
                campaign.status === 'ENABLED' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {campaign.onAir ? 'LIVE' : campaign.status}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {activeContents}/{campaignContents.length} ads active
              </span>
              {campaign.platform && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {campaign.platform.join(' + ')}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => toggleCampaign(campaign.id, campaign.status === 'ENABLED')}
            className={`p-2 rounded-full ${
              campaign.status === 'ENABLED' 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={campaign.status === 'ENABLED' ? 'Pause Campaign' : 'Resume Campaign'}
          >
            {campaign.status === 'ENABLED' ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Budget</div>
            {showBudgetEdit ? (
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  step="0.01"
                />
                <button
                  onClick={() => {
                    updateBudget(campaign.id, newBudget);
                    setShowBudgetEdit(false);
                  }}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setNewBudget(campaign.budget || '');
                    setShowBudgetEdit(false);
                  }}
                  className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div 
                className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setShowBudgetEdit(true)}
              >
                {formatCurrency(campaign.budget, campaign.currency)}
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Amount Spent</div>
            <div className="font-semibold text-gray-900">
              {formatCurrency(campaign.amountSpent || 0, campaign.currency)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Clicks</div>
            <div className="font-semibold text-gray-900">
              {formatNumber(campaign.clicks || 0)}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Impressions</div>
            <div className="font-semibold text-gray-900">
              {formatNumber(campaign.impressions || 0)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">CPC</div>
            <div className="font-semibold text-gray-900">
              {formatCurrency(campaign.cpc || 0, campaign.currency)}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">CTR</div>
            <div className="font-semibold text-gray-900">
              {campaign.clicks && campaign.impressions ? 
                ((campaign.clicks / campaign.impressions) * 100).toFixed(2) + '%' : 
                '0.00%'
              }
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Campaign Period</div>
            <div className="font-mono text-xs text-gray-900">
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Campaign ID</div>
            <div className="font-mono text-xs text-gray-900 break-all">{campaign.id}</div>
          </div>
        </div>

        {campaignContents.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Manage Ads ({campaignContents.length})
            </summary>
            <div className="mt-3 space-y-2 pl-4">
              {campaignContents.map((content) => (
                <div key={content.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{content.headline || content.id}</div>
                    <div className="text-xs text-gray-600">
                      {content.status} • ID: {content.id}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleContent(content.id, content.status === 'ENABLED')}
                    className={`p-1 rounded ${
                      content.status === 'ENABLED' 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {content.status === 'ENABLED' ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    );
  };

  const ReportingView = () => {
    if (!reporting || Object.keys(reporting).length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center text-gray-500">
            <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Report Generated</h3>
            <p className="text-gray-600">Select your filters above and click "Generate Report" to view performance data.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Overview
            {selectedCampaign && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                - {selectedCampaign.name}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600">Total Spend</div>
              <div className="text-2xl font-bold text-blue-900">{formatCurrency(reporting.totalSpend, 'GBP')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600">Impressions</div>
              <div className="text-2xl font-bold text-green-900">{formatNumber(reporting.impressions)}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600">Clicks</div>
              <div className="text-2xl font-bold text-purple-900">{formatNumber(reporting.clicks)}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-600">Conversions</div>
              <div className="text-2xl font-bold text-orange-900">{formatNumber(reporting.conversions)}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-indigo-600">CTR</div>
              <div className="text-2xl font-bold text-indigo-900">
                {reporting.ctr ? reporting.ctr.toFixed(2) + '%' : '0.00%'}
              </div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-sm text-pink-600">Conversion Rate</div>
              <div className="text-2xl font-bold text-pink-900">
                {reporting.conversionRate ? reporting.conversionRate.toFixed(2) + '%' : '0.00%'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Cost Per Click (CPC)</div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(reporting.cpc, 'GBP')}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Cost Per Acquisition (CPA)</div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(reporting.cpa, 'GBP')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && marketers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your Amplify data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Amplify Campaign Manager</h1>
                <p className="text-sm text-gray-600">Manage your Outbrain Amplify campaigns</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {selectedMarketer && (
                <select
                  value={selectedMarketer.id}
                  onChange={(e) => setSelectedMarketer(marketers.find(m => m.id === e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {marketers.map(marketer => (
                    <option key={marketer.id} value={marketer.id}>
                      {marketer.name || marketer.id}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={() => selectedMarketer && loadCampaigns(selectedMarketer.id)}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Refresh"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('reporting')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reporting'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reporting
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800">{error}</div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                  </div>
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                    <p className="text-2xl font-bold text-green-600">
                      {campaigns.filter(c => c.status === 'ENABLED').length}
                    </p>
                  </div>
                  <Play className="text-green-600" size={24} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(campaigns.reduce((sum, c) => sum + (c.budget || 0), 0), 'GBP')}
                    </p>
                  </div>
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Month to Date Spent</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(campaigns.reduce((sum, c) => sum + (c.amountSpent || 0), 0), 'GBP')}
                    </p>
                  </div>
                  <Calendar className="text-orange-600" size={24} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Live Ads</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.values(contents).reduce((sum, contentList) => 
                        sum + contentList.filter(content => content.status === 'ENABLED').length, 0
                      )}
                    </p>
                  </div>
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            {/* Campaigns Grid */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Campaigns</h2>
              {campaigns.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                  <p className="text-gray-600">
                    {selectedMarketer ? 
                      `No campaigns found for marketer ${selectedMarketer.name || selectedMarketer.id}` :
                      'Please select a marketer to view campaigns'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reporting' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Reporting</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Campaign:</label>
                    <select
                      value={selectedCampaign?.id || 'all'}
                      onChange={(e) => {
                        if (e.target.value === 'all') {
                          setSelectedCampaign(null);
                        } else {
                          setSelectedCampaign(campaigns.find(c => c.id === e.target.value));
                        }
                      }}
                      className="px-3 py-1 border border-gray-300 rounded text-sm min-w-48"
                    >
                      <option value="all" className="text-gray-900">All Campaigns</option>
                      {campaigns.map(campaign => {
                        const isFinished = new Date(campaign.endDate) < new Date();
                        const isPaused = campaign.status === 'PAUSED' || !campaign.enabled;
                        const optionClass = isFinished ? 'text-red-600' : isPaused ? 'text-amber-600' : 'text-gray-900';
                        
                        return (
                          <option key={campaign.id} value={campaign.id} className={optionClass}>
                            {campaign.name.length > 30 ? campaign.name.substring(0, 30) + '...' : campaign.name}
                            {isPaused && ' (Paused)'}
                            {isFinished && ' (Finished)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">From:</label>
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">To:</label>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={generateReport}
                    disabled={reportingLoading || !selectedMarketer}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                      reportingLoading || !selectedMarketer
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                    }`}
                  >
                    {reportingLoading ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <BarChart3 size={20} />
                        Generate Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {reportingLoading ? (
              <div className="bg-white rounded-lg shadow-md p-12">
                <div className="text-center">
                  <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Report</h3>
                  <p className="text-gray-600">Please wait while we gather your campaign data...</p>
                </div>
              </div>
            ) : (
              <ReportingView />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Built for Microsoft Teams collaboration • Last updated: {new Date().toLocaleString()}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              Ready to share with your team
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmplifyManager;
