import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=712e3d30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=712e3d30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=712e3d30"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.tsx?t=1759269662070";
import "/node_modules/@mantine/core/styles.css";
import "/node_modules/@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=712e3d30";
import { WagmiProvider } from "/node_modules/.vite/deps/wagmi.js?v=712e3d30";
import { config } from "/src/utils/connect.ts";
import { UserProvider } from "/src/context/UserContext.tsx";
import { MantineProvider } from "/node_modules/.vite/deps/@mantine_core.js?v=712e3d30";
import { cssVariablesResolver, theme } from "/src/theme.ts?t=1759267849774";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(WagmiProvider, { config, children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(UserProvider, { children: /* @__PURE__ */ jsxDEV(
    MantineProvider,
    {
      withCssVariables: true,
      theme,
      defaultColorScheme: "dark",
      cssVariablesResolver,
      children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
        fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
      lineNumber: 21,
      columnNumber: 11
    },
    this
  ) }, void 0, false, {
    fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
    lineNumber: 20,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/home/jord/Documents/repos/beamz-app/src/main.tsx",
    lineNumber: 17,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMEJZO0FBMUJaLE9BQU9BLFdBQVc7QUFDbEIsT0FBT0MsY0FBYztBQUNyQixPQUFPQyxTQUFTO0FBQ2hCLE9BQU87QUFDUCxPQUFPO0FBQ1AsU0FBU0MsYUFBYUMsMkJBQTJCO0FBQ2pELFNBQVNDLHFCQUFxQjtBQUM5QixTQUFTQyxjQUFjO0FBRXZCLFNBQVNDLG9CQUFvQjtBQUM3QixTQUFTQyx1QkFBdUI7QUFDaEMsU0FBU0Msc0JBQXNCQyxhQUFhO0FBRTVDLE1BQU1DLGNBQWMsSUFBSVIsWUFBWTtBQUVwQ0YsU0FBU1csV0FBV0MsU0FBU0MsZUFBZSxNQUFNLENBQWdCLEVBQUVDO0FBQUFBLEVBQ2xFLHVCQUFDLE1BQU0sWUFBTixFQUNDLGlDQUFDLGlCQUFjLFFBQ2IsaUNBQUMsdUJBQW9CLFFBQVFKLGFBQzNCLGlDQUFDLGdCQUNDO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBLG9CQUFtQjtBQUFBLE1BQ25CO0FBQUEsTUFFQSxpQ0FBQyxTQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBSTtBQUFBO0FBQUEsSUFOTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPQSxLQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FTQSxLQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FXQSxLQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FhQSxLQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FlQTtBQUNGIiwibmFtZXMiOlsiUmVhY3QiLCJSZWFjdERPTSIsIkFwcCIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsIldhZ21pUHJvdmlkZXIiLCJjb25maWciLCJVc2VyUHJvdmlkZXIiLCJNYW50aW5lUHJvdmlkZXIiLCJjc3NWYXJpYWJsZXNSZXNvbHZlciIsInRoZW1lIiwicXVlcnlDbGllbnQiLCJjcmVhdGVSb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC50c3gnO1xuaW1wb3J0ICdAbWFudGluZS9jb3JlL3N0eWxlcy5jc3MnO1xuaW1wb3J0ICdAbWFudGluZS9ub3RpZmljYXRpb25zL3N0eWxlcy5jc3MnO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknO1xuaW1wb3J0IHsgV2FnbWlQcm92aWRlciB9IGZyb20gJ3dhZ21pJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vdXRpbHMvY29ubmVjdC50cyc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBVc2VyUHJvdmlkZXIgfSBmcm9tICcuL2NvbnRleHQvVXNlckNvbnRleHQudHN4JztcbmltcG9ydCB7IE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuaW1wb3J0IHsgY3NzVmFyaWFibGVzUmVzb2x2ZXIsIHRoZW1lIH0gZnJvbSAnLi90aGVtZS50cyc7XG5cbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG5cblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSBhcyBIVE1MRWxlbWVudCkucmVuZGVyKFxuICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICA8V2FnbWlQcm92aWRlciBjb25maWc9e2NvbmZpZ30+XG4gICAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cbiAgICAgICAgPFVzZXJQcm92aWRlcj5cbiAgICAgICAgICA8TWFudGluZVByb3ZpZGVyXG4gICAgICAgICAgICB3aXRoQ3NzVmFyaWFibGVzXG4gICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICBkZWZhdWx0Q29sb3JTY2hlbWU9XCJkYXJrXCJcbiAgICAgICAgICAgIGNzc1ZhcmlhYmxlc1Jlc29sdmVyPXtjc3NWYXJpYWJsZXNSZXNvbHZlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgPC9NYW50aW5lUHJvdmlkZXI+XG4gICAgICAgIDwvVXNlclByb3ZpZGVyPlxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICAgIDwvV2FnbWlQcm92aWRlcj5cbiAgPC9SZWFjdC5TdHJpY3RNb2RlPlxuKTtcbiJdLCJmaWxlIjoiL2hvbWUvam9yZC9Eb2N1bWVudHMvcmVwb3MvYmVhbXotYXBwL3NyYy9tYWluLnRzeCJ9