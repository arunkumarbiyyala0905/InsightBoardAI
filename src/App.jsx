import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatbotUI } from './components/ChatbotUI';
import { mockProductsData, mockGrowthData, mockRegionalShareData, mockRevenueData } from './data/constants';

// --- Main App Component ---
export default function App() {
  // State management for chat and dashboard
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChartGroup, setCurrentChartGroup] = useState(null);

  const chatMessagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat messages when a new message is added.
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Simulated LLM API call for chatbot responses.
  const fetchLLMResponse = useCallback(async (userPrompt) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerCasePrompt = userPrompt.toLowerCase();
    let responseText = "I'm sorry, I don't understand that request. Try asking me about the available charts like 'sales by product' or 'customer growth'.";
    if (lowerCasePrompt.includes('hello') || lowerCasePrompt.includes('hi') || lowerCasePrompt.includes('hey')) {
      responseText = "Hello! I'm your AI assistant. You can ask me to help you visualize data. Try dragging a chart from the left sidebar to the dashboard.";
    } else if (
        lowerCasePrompt.includes('thank you') ||
        lowerCasePrompt.includes('thanks') ||
        lowerCasePrompt.includes('nice') ||
        lowerCasePrompt.includes('awesome') ||
        lowerCasePrompt.includes('great')
      ) {
        responseText = "You're very welcome! I'm glad I could help.";
      } else if (lowerCasePrompt.includes('sales by product') || lowerCasePrompt.includes('insights from sales') || lowerCasePrompt.includes('product performance')) {
      const totalSold = mockProductsData.datasets[0].data.reduce((sum, value) => sum + value, 0);
      const productA_units = mockProductsData.datasets[0].data[0];
      const productA_share = ((productA_units / totalSold) * 100).toFixed(2);
      const mostSoldProduct = mockProductsData.labels[mockProductsData.datasets[0].data.indexOf(Math.max(...mockProductsData.datasets[0].data))];
      const leastSoldProduct = mockProductsData.labels[mockProductsData.datasets[0].data.indexOf(Math.min(...mockProductsData.datasets[0].data))];

      responseText = `Based on the Sales by Product data, here are some key insights:\n\n1. The total units sold across all products is ${totalSold}.\n2. **${mostSoldProduct}** is the top-selling product with ${Math.max(...mockProductsData.datasets[0].data)} units sold, accounting for the highest share of sales.\n3. **${leastSoldProduct}** is the lowest-selling product with ${Math.min(...mockProductsData.datasets[0].data)} units sold.\n4. Product A has a significant share of sales, contributing approximately ${productA_share}% of the total units sold.`;
    } else if (lowerCasePrompt.includes('customer growth') || lowerCasePrompt.includes('insights from growth') || lowerCasePrompt.includes('growth trend')) {
      const startGrowth = mockGrowthData.datasets[0].data[0];
      const endGrowth = mockGrowthData.datasets[0].data[mockGrowthData.datasets[0].data.length - 1];
      const totalGrowth = (endGrowth - startGrowth).toFixed(2);
      const highestGrowthMonth = mockGrowthData.labels[mockGrowthData.datasets[0].data.indexOf(Math.max(...mockGrowthData.datasets[0].data))];

      responseText = `Based on the Customer Growth data, here are some key insights:\n\n1. The customer base has experienced a steady growth trend from ${startGrowth}% in January to ${endGrowth}% in June.\n2. This represents an overall growth of ${totalGrowth}% over the six-month period.\n3. The month with the highest growth was **${highestGrowthMonth}**, reaching a growth rate of ${endGrowth}%.`;
    } else if (lowerCasePrompt.includes('regional market share') || lowerCasePrompt.includes('insights from regional')) {
      const totalShare = mockRegionalShareData.datasets[0].data.reduce((sum, value) => sum + value, 0);
      const highestShareRegion = mockRegionalShareData.labels[mockRegionalShareData.datasets[0].data.indexOf(Math.max(...mockRegionalShareData.datasets[0].data))];
      const highestShareValue = Math.max(...mockRegionalShareData.datasets[0].data);
      const lowestShareRegions = mockRegionalShareData.labels.filter((label, index) => mockRegionalShareData.datasets[0].data[index] === Math.min(...mockRegionalShareData.datasets[0].data));
      const lowestShareValue = Math.min(...mockRegionalShareData.datasets[0].data);

      responseText = `Based on the Regional Market Share data, here are some key insights:\n\n1. **${highestShareRegion}** is the leading region, holding a dominant market share of ${highestShareValue}%. \n2. The **${lowestShareRegions.join(' and ')}** regions have the lowest share, each at ${lowestShareValue}%. \n3. There is a clear opportunity to increase market penetration in the southern and western regions to balance the distribution.`;
    } else if (lowerCasePrompt.includes('total revenue') || lowerCasePrompt.includes('insights from revenue')) {
      const totalRevenue = mockRevenueData.datasets[0].data.reduce((sum, value) => sum + value, 0);
      const highestRevenueQuarter = mockRevenueData.labels[mockRevenueData.datasets[0].data.indexOf(Math.max(...mockRevenueData.datasets[0].data))];
      const highestRevenueValue = Math.max(...mockRevenueData.datasets[0].data);
      const lowestRevenueQuarter = mockRevenueData.labels[mockRevenueData.datasets[0].data.indexOf(Math.min(...mockRevenueData.datasets[0].data))];
      const lowestRevenueValue = Math.min(...mockRevenueData.datasets[0].data);

      responseText = `Based on the Total Revenue data, here are some key insights:\n\n1. The total revenue for the year is a strong **$${totalRevenue.toLocaleString()}**.\n2. The best-performing quarter was **${highestRevenueQuarter}**, with a record revenue of $${highestRevenueValue.toLocaleString()}.\n3. Revenue experienced a slight dip in Q3 before a significant recovery in Q4.\n4. The quarter with the lowest revenue was ${lowestRevenueQuarter}, with $${lowestRevenueValue.toLocaleString()}.`;
    } else if (lowerCasePrompt.includes('sales')) {
      responseText = "To see a breakdown of sales by product, drag the 'Sales by Product' chart to the dashboard. It will create a bar chart and other related visualizations for you.";
    } else if (lowerCasePrompt.includes('customer growth')) {
      responseText = "To view the trend of our customer growth, drag the 'Customer Growth Trend' chart to the dashboard. This will show you a line chart of the data.";
    } else if (lowerCasePrompt.includes('revenue')) {
      responseText = "To see a breakdown of total revenue, drag the 'Total Revenue' chart to the dashboard. It will show you a pie chart of the data.";
    }
    return responseText;
  }, []);

  // Handles sending a new chat message and getting the AI response.
  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { sender: 'User', text: inputMessage };
      setChats(prevChats => [...prevChats, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      const aiResponseText = await fetchLLMResponse(inputMessage);

      setChats(prevChats => [...prevChats, { sender: 'AI Assistant', text: aiResponseText }]);
      setIsLoading(false);
    }
  }, [inputMessage, fetchLLMResponse]);

  const chartItems = [
    { name: 'Sales by Product', title: 'Product Sales Overview', dataKey: 'products', icon: BarChart },
    { name: 'Customer Growth Trend', title: 'Customer Growth over Time', dataKey: 'growth', icon: LineChart },
    { name: 'Regional Market Share', title: 'Market Share by Region', dataKey: 'regional', icon: PieChart },
    { name: 'Total Revenue', title: 'Revenue Distribution', dataKey: 'revenue', icon: PieChart },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-100 font-sans">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mt-4 mb-2">
          InsightBoard
        </h1>
        {/* Main content container with responsive layout using a grid */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_350px] gap-4 p-4 flex-1 overflow-hidden">
          {/* Left Sidebar for Drag-and-Drop Elements */}
          <Sidebar chartItems={chartItems} />

          {/* Main Dashboard Content Area */}
          <main className="overflow-y-scroll">
            <Dashboard chartGroup={currentChartGroup} setChartGroup={setCurrentChartGroup} />
          </main>

          {/* Right Sidebar for Chatbot UI */}
          <ChatbotUI
            chats={chats}
            inputMessage={inputMessage}
            isLoading={isLoading}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            chatMessagesEndRef={chatMessagesEndRef}
          />
        </div>
      </div>
    </DndProvider>
  );
}
