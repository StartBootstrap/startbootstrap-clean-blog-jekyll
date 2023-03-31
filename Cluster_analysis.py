import os
import pickle
import spacy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.offline as offline
import plotly.graph_objs as go
import seaborn as sns

HOVER_TEMPLATE = "<br><b>%{hovertext}</b><br><br>" + "Movie: %{customdata[0]}<br>" + "Release date: %{customdata[1]}<br>"  
HOVER_TEMPLATE += "Actor name: %{customdata[2]}<br>" +  "Actor age at release: %{customdata[3]}<br>" 
HOVER_TEMPLATE += "Gender: %{customdata[4]}<br>" + "Character archetype: %{customdata[6]}<br>" 
HOVER_TEMPLATE += "Description: %{customdata[7]}<br>" + "Genres: %{customdata[8]}<br>" + "Box office revenue: %{customdata[9]}<br>" 
TITLES = ['Decision-makers', 'Heroes & anti-heroes', 'Femme fatale', 'Cunning evil', 'Clumsy', 'Virtuous', 'Righteous warrior', 'Benevolent leader', 'Wise mentor', 'Captain', 'Ingenuous', 'Tycoon', 'Ruthless commander', 'Arrogant leader', 'Love interest', 'Reconciliator', 'Adventurous woman', 'Apprentice', 'Young lover', 'Logistician', 'Lawyer', 'Stubborn fool', 'Eccentric villain', 'Marksman', 'Goofy friend', 'Hardworking learner', 'Benevolent', 'Sophisticated psycopath', 'Nemesis', 'Corrupt', 'Good cop', 'Musician', 'Protector', 'Family-oriented']
COLOR_SCALE = px.colors.cyclical.HSV
COLOR_PALETTE = [[round(255*c) for c in color] for color in sns.color_palette("hls", len(TITLES))]

def compute_centroids(df, column='labels'):
    ''' Make a dataframe with the centroids of each cluster'''
    # Compute centroid of each cluster
    centers = []
    for i in range(len(TITLES)):
        cluster = df[df[column] == i]
        if len(cluster) > 0: 
            centers.append(cluster[['X', 'Y', 'Z']].mean().values)
        else: 
            centers.append([np.nan, np.nan, np.nan])
    
    # Create dataframe with centroids title and coordinates
    centroids = pd.DataFrame(TITLES, columns=['title'])
    centroids['X'] = [x[0] for x in centers]
    centroids['Y'] = [x[1] for x in centers]
    centroids['Z'] = [x[2] for x in centers]
    return centroids

def set_scatter(df):
    ''' Add scatter plot of all points to the figure.'''
    fig = px.scatter_3d(
        df, x='X', y='Y', z='Z', 
        color = 'labels', color_continuous_scale = COLOR_SCALE, 
        opacity=0.7, 
        hover_name='Character name',
        hover_data={
            'Name': True, 'Release date': True, 'Actor name': True, 
            'Actor age at release': True, 'Gender': True, 
            'X': False, 'Y': False, 'Z': False, 'labels': False, 'title': True, 
            'description': True, 'Genres': True, 'box_office': True, 
            'partner': False}, 
        )
    fig.update_traces(marker=dict(line=dict(width=1, color='white')))
    box_office = [x for x in df['Box office revenue'] if type(x) == float]
    mean_box_office = np.mean(box_office) if len(box_office) > 0 else 100
    fig = fig.update_traces(marker=dict(size=[5 if x == 'Not Available' else 6 + 2 * x / mean_box_office for x in df['Box office revenue']]), opacity=0.8)
    return fig

def set_layout(fig):
    ''' Set the layout of the figure. '''
    axis_params = dict(showbackground=False, showticklabels=False, visible=False, showgrid=False, showline=False)
    layout = dict(
        hoverlabel=dict(bgcolor="white", font_size=16, font_family="Rockwell", namelength=-1,),
        scene=dict(xaxis=axis_params, yaxis=axis_params, zaxis=axis_params,),
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        coloraxis_showscale=False,
        showlegend=False,
        height=800, width=1100, 
        scene_camera_eye=dict(x=0.7, y=0.7, z=0.7), 
    )
    fig = fig.update_traces(hovertemplate=HOVER_TEMPLATE)
    fig = fig.update_traces(marker=dict(colorscale=COLOR_SCALE))
    fig = fig.update_layout(layout)
    return fig

def create_cloud(df, save=False): 
    '''Create a 3D scatter plot with centroid titles.''' 
    # Create scatter plot
    fig = set_scatter(df)
    
    # Add annotations to centroids
    centroids = compute_centroids(df, 'labels')
    annotations = [dict(x=x, y=y, z=z, text=title, xanchor='center', yanchor='middle', showarrow=False, font=dict(size=10, color='black'), bgcolor='white', borderpad=1.5, opacity=0.7) for x, y, z, title in zip(centroids['X'], centroids['Y'], centroids['Z'], centroids['title'])]
    fig.update_scenes(annotations=annotations)
    fig = set_layout(fig)

    # Save the plot if specified
    if save:
        fig.write_html("Plots/Full_plot.html")
        
    return fig

# Define buttons and corresponding visibility
def visibility(i, vis_idx, length=10): 
    visible = [False] * length
    for v in vis_idx[i]: 
        visible[v] = True
    return visible
        
def create_cat_clouds(df, save=False): 
    # Make a dataframe for each category
    df_rom = df[(df['romance'] == True)]
    df_nonrom = df[(df['romance'] == False)]
    df_male = df[(df['Gender'] == 'M')]
    df_female = df[(df['Gender'] == 'F') ]
    df_unknown = df[(df['Gender'] == 'Not Available')]

    # Make a figure with two traces, one with all points in color, one with all points in grey
    all = set_scatter(df)
    scatter_rom = set_scatter(df_rom)
    scatter_nonrom = set_scatter(df_nonrom)
    scatter_male = set_scatter(df_male)
    scatter_female = set_scatter(df_female)
    scatter_unknown = set_scatter(df_unknown)

    # Add color + grey traces for each category and their inverse
    fig_romgen = go.Figure()
    fig_romgen.add_trace(all.data[0])               # 0: Color all
    fig_romgen.add_trace(scatter_rom.data[0])       # 1: Color romance
    fig_romgen.add_trace(scatter_nonrom.data[0])    # 2: Grey nonromance
    fig_romgen.add_trace(scatter_nonrom.data[0])    # 3: Color nonromance
    fig_romgen.add_trace(scatter_rom.data[0])       # 4: Grey romance   
    fig_romgen.add_trace(scatter_male.data[0])      # 5: Color male
    fig_romgen.add_trace(scatter_female.data[0])    # 6: Grey female
    fig_romgen.add_trace(scatter_female.data[0])    # 7: Color female
    fig_romgen.add_trace(scatter_male.data[0])      # 8: Grey male
    fig_romgen.add_trace(scatter_unknown.data[0])   # 9: Grey unknown

    # Make all points invisible except color_all
    for i in range(1, 10):
        fig_romgen.data[i].visible = False

    # Add annotations to centroids
    centroids = compute_centroids(df, 'labels')
    annotations = [dict(x=x, y=y, z=z, text=title, xanchor='center', yanchor='middle', showarrow=False, font=dict(size=10, color='black'), bgcolor="white", borderpad=1.5, opacity=0.7) for x, y, z, title in zip(centroids['X'], centroids['Y'], centroids['Z'], centroids['title'])]
    fig_romgen.update_scenes(annotations=annotations)
    fig_romgen = set_layout(fig_romgen)

    # Make color gray for some traces
    for i in [2, 4, 6, 8, 9]:
        fig_romgen.data[i].marker.color = 'rgba(0,0,0,0.15)'
        
    # Add buttons for each category
    vis_idx = [[0], [1,2], [3,4], [5,6,9], [7,8,9]]
    button_names = ['All', 'Romance', 'Non-Romance', 'Male', 'Female']
    buttons = []
    for i in range(len(button_names)):
        buttons.append(dict(
            label=button_names[i], 
            method='update', 
            args=[{'visible': visibility(i, vis_idx, length=10)}]))

    # Update layout for each button
    fig_romgen.update_layout(
        updatemenus=[
            dict(
                type="buttons", direction="left", x=0.35, y=1.12, font=dict(color="black"),
                bgcolor="grey", xanchor = 'left', yanchor = 'top', buttons=buttons,
                pad={"r": 10, "t": 10}, showactive=True
            ),
        ]
    )


    if save:
        fig_romgen.write_html("Plots/Romancegen_plot.html")
    
    return fig_romgen

def add_relations(rel_fig, df):
    ''' Add relation links between plots '''
    num_traces = 1
    for i in range(len(df)):
        if df['partner'][i] != 'No partner':
            for j in range(len(df['partner'][i])):
                index = df.index[df['Freebase character ID'] == df['partner'][i][j]].tolist()[0]
                rel_fig.add_trace(
                    go.Scatter3d(
                        x=[df['X'][i], df['X'][index]], 
                        y=[df['Y'][i], df['Y'][index]], 
                        z=[df['Z'][i], df['Z'][index]], 
                        mode='lines', hoverinfo='none', 
                        line=dict(color=df['labels'][i], width=3, colorscale=COLOR_SCALE), 
                        opacity=0.25))
                num_traces += 1
    
    return rel_fig, num_traces



def create_rel_cloud(df, save=False):
    ''' Create a 3D plot with all characters and their relationships. '''
    rel_fig = create_cloud(df)
    rel_fig, num_traces = add_relations(rel_fig, df)

    # Add update layout to the figure by toggling lines on and off
    rel_fig.update_layout(
        updatemenus=[
            dict(
                type="buttons", direction="left", x=0.35, y=1.12, font=dict(color="black"),
                bgcolor="grey", xanchor = 'left', yanchor = 'top', 
                pad={"r": 10, "t": 10}, #showactive=True,
                buttons=list([
                    dict(
                        args=[{"visible": [True] + [False] * (num_traces - 1)}],
                        label="Hide relationships",
                        method="update"
                    ),
                    dict(
                        args=[{"visible": [True] * num_traces}],
                        label="Show relationships",
                        method="update"
                    )
                ]),
            ),
        ]
    )
    if save:
        rel_fig.write_html("Plots/Relations_plot.html")
    return rel_fig

def split_by_date(df):
    ''' Split the dataframe into 6 different time periods. '''
    time_df = df.copy()
    time_df['Release date'] = time_df['Release date'].replace('Not Available', np.nan)
    idx_1a =  (time_df['Release date'] < 1920).values
    idx_2a =  ((time_df['Release date'] >= 1920) & (time_df['Release date'] < 1940)).values
    idx_3a =  ((time_df['Release date'] >= 1940) & (time_df['Release date'] < 1960)).values
    idx_4a =  ((time_df['Release date'] >= 1960) & (time_df['Release date'] < 1980)).values
    idx_5a =  ((time_df['Release date'] >= 1980) & (time_df['Release date'] < 2000)).values
    idx_6a =  (time_df['Release date'] >= 2000).values
    idx_list = [idx_1a, idx_2a, idx_3a, idx_4a, idx_5a, idx_6a]
    return idx_list

def create_time_cloud(df, save=False):
    ''' Create a 3D plot with characters over time periods.'''
    fig_time = go.Figure()
    df_time = df.copy(deep=True)

    # Split the dataframe by release date period
    idx_list = split_by_date(df)
    for i in range(len(idx_list)):
        mask = idx_list[i]

        # For each period, make a colored scatter plot
        df_color = df_time[mask]
        scatter = set_scatter(df_color)
        fig_time.add_trace(scatter.data[0])

        # Color the other periods in gray
        df_gray = df_time[~mask]
        gray_scatter = set_scatter(df_gray)
        fig_time.add_trace(gray_scatter.data[0])
        fig_time.data[-1].marker.color = 'rgba(0,0,0,0.15)'
    
    # At the beginning, the first trace should be visible
    fig_time.data[0].visible = True
    fig_time.data[1].visible = True
    for i in range(2, len(fig_time.data)):
        fig_time.data[i].visible = False

    centroids = compute_centroids(df, 'labels')
    annotations = [dict(x=x, y=y, z=z, text=title, xanchor='center', yanchor='middle', showarrow=False, font=dict(size=10, color='black'), bgcolor="white", borderpad=1.5, opacity=0.7) for x, y, z, title in zip(centroids['X'], centroids['Y'], centroids['Z'], centroids['title'])]
    fig_time.update_scenes(annotations=annotations)
    fig_time = set_layout(fig_time)

    # Make the sliders parameters
    vis_idx = [[0,1], [2,3], [4,5], [6,7], [8,9], [10,11]]
    periods = ['1900-1920', '1920-1939', '1940-1959', '1960-1979', '1980-1999', '2000-Today']
    steps = []
    for i in range(6):
        step = dict(
            method="restyle",
            args=["visible", visibility(i, vis_idx, length=12)],
            label = periods[i],
        )
        steps.append(step)

    # Make sliders with text as time period
    sliders = [dict(
        active=0, currentvalue={"prefix": "Time period: "},
        pad={"t": 10}, x=0.4, len=0.5, xanchor="left", yanchor="top",
        steps=steps
    )]
    fig_time.update_layout(
        sliders=sliders
    )

    if save: 
        fig_time.write_html("Plots/plot_time.html")
    return fig_time
